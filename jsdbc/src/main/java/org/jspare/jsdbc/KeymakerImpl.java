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

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.security.auth.login.CredentialNotFoundException;

import org.jspare.core.container.Inject;
import org.jspare.core.exception.SerializationException;
import org.jspare.core.loader.ResourceLoader;
import org.jspare.core.serializer.Serializer;
import org.jspare.jsdbc.exception.JsdbcException;
import org.jspare.jsdbc.model.Credential;
import org.jspare.jsdbc.model.DataSource;

import com.google.gson.reflect.TypeToken;

import lombok.extern.slf4j.Slf4j;

/** The Constant log. */

/** The Constant log. */
@Slf4j
public class KeymakerImpl implements Keymaker {

	/** The Constant SUPER_KEY. */
	private static final String SUPER_KEY = "DEFAULT";
	
	/** The Constant DEFAULT_CREDENTAIL_FILENAME. */
	private static final String DEFAULT_CREDENTAIL_FILENAME = "credentials";
	
	/** The Constant DEFAULT_PATH_FORMAT. */
	private static final String DEFAULT_PATH_FORMAT = System.getProperty("user.home").concat(File.separator).concat(".jsdb")
			.concat(File.separator).concat(DEFAULT_CREDENTAIL_FILENAME);

	/** The data source. */
	private DataSource dataSource;

	/** The serializer. */
	@Inject
	private Serializer serializer;

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Keymaker#loadDiskCredentials()
	 */
	@Override
	public Credential loadDiskCredentials() throws JsdbcException {

		if (dataSource == null) {

			throw new JsdbcException("DataSource not provided");
		}

		try {
			String content = my(ResourceLoader.class).readFileToString(DEFAULT_PATH_FORMAT);
			Map<String, String> credentials = serializer.fromJSON(content, new TypeToken<Map<String, String>>() {
			}.getType());

			Credential credential = Credential.of(credentials.get(dataSource.getInstance()));
			if (credential == null) {

				if (credentials.containsKey(SUPER_KEY)) {

					log.warn("Using SuperUser consider set one for this instance");
					return Credential.of(credentials.get(SUPER_KEY));
				}

				throw new CredentialNotFoundException();
			}

			return credential;
		} catch (IOException | SerializationException | CredentialNotFoundException e) {

			throw new JsdbcException("Credential not found", e);
		}
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Keymaker#provideDataSource(org.jspare.jsdbc.model.DataSource)
	 */
	@Override
	public Keymaker provideDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		return this;
	}
}
