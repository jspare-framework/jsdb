/*
 * Copyright 2016 JSpare.org.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.jspare.jsdbc;

import static org.jspare.core.container.Environment.my;

import java.util.Optional;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.jspare.core.container.Inject;
import org.jspare.core.serializer.Serializer;
import org.jspare.jsdbc.exception.CommandFailException;
import org.jspare.jsdbc.exception.JsdbcException;
import org.jspare.jsdbc.model.Credential;
import org.jspare.jsdbc.model.DataSource;
import org.jspare.jsdbc.model.Domain;
import org.jspare.jsdbc.model.ErrorResult;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/** The Constant log. */

/** The Constant log. */
@Slf4j

/**
 * Instantiates a new jsdbc transport impl.
 */

/**
 * Instantiates a new jsdbc transport impl.
 */
@RequiredArgsConstructor
public class JsdbcTransportImpl implements JsdbcTransport {

	/** The Constant AUTHENTICATION_KEY. */
	private static final String AUTHENTICATION_KEY = "scy-tkn-auth";
	
	/** The Constant AGENT_KEY. */
	private static final String AGENT_KEY = "User-Agent";
	
	/** The Constant AGENT. */
	private static final String AGENT = "JSDB-NC/1.0.0";

	/** The keymaker. */
	@Inject
	private Keymaker keymaker;

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.JsdbcTransport#execute(org.jspare.jsdbc.model.DataSource, org.jspare.jsdbc.model.Credential, java.util.Optional, java.lang.String, int, java.lang.String)
	 */
	@Override
	public String execute(DataSource datasource, Credential credential, Optional<Domain> domain, String operation, int method, String data)
			throws JsdbcException {

		if (datasource == null) {

			throw new JsdbcException("DataSource not loaded");
		}

		try {

			Request request = null;
			org.apache.http.client.fluent.Response response = null;

			String uriAddress = getUrlConnection(datasource, operation, Optional.of(domain.orElse(Domain.of(StringUtils.EMPTY)).domain()));
			if (method == RETRIEVE) {
				request = Request.Get(new URIBuilder(uriAddress).build().toString());
			} else if (method == SEND) {
				request = Request.Post(new URIBuilder(uriAddress).build().toString()).bodyString(data, ContentType.APPLICATION_JSON);
			} else {
				throw new JsdbcException("Method called is not mapped");
			}
			request.addHeader(AGENT_KEY, AGENT);

			response = buildAuthentication(request, datasource, credential).execute();

			HttpResponse httpResponse = response.returnResponse();

			int statusCode = httpResponse.getStatusLine().getStatusCode();
			if (statusCode < HttpStatus.SC_OK || statusCode >= HttpStatus.SC_MULTIPLE_CHOICES) {

				if (statusCode == HttpStatus.SC_BAD_REQUEST) {

					throw new JsdbcException("Authorization error, validate your credentials.");
				}
				if (statusCode == HttpStatus.SC_FORBIDDEN) {

					throw new JsdbcException("Forbidden access, validate your user roles.");
				}

				String content = IOUtils.toString(httpResponse.getEntity().getContent());

				ErrorResult result = my(Serializer.class).fromJSON(content, ErrorResult.class);
				throw new CommandFailException(result);
			}

			return IOUtils.toString(httpResponse.getEntity().getContent());

		} catch (Exception e) {

			log.error(e.getMessage(), e);
			throw new JsdbcException("JSDB Server Error");
		}
	}

	/**
	 * Builds the authentication.
	 *
	 * @param request
	 *            the request
	 * @param datasource
	 *            the datasource
	 * @param credential
	 *            the credential
	 * @return the request
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	private Request buildAuthentication(Request request, DataSource datasource, Credential credential) throws JsdbcException {

		if (credential == null) {
			credential = keymaker.provideDataSource(datasource).loadDiskCredentials();
		}

		return request.addHeader(AUTHENTICATION_KEY, credential.getToken());
	}

	/**
	 * Gets the url connection.
	 *
	 * @param datasource
	 *            the datasource
	 * @param operation
	 *            the operation
	 * @param domain
	 *            the domain
	 * @return the url connection
	 */
	private String getUrlConnection(DataSource datasource, String operation, Optional<String> domain) {
		StringBuilder url = new StringBuilder();
		url.append(datasource.getHost());
		url.append(":");
		url.append(datasource.getPort());
		url.append(operation);
		return url.toString().replace(":instance", datasource.getInstance()).replace(":domain", domain.orElse(StringUtils.EMPTY));
	}
}