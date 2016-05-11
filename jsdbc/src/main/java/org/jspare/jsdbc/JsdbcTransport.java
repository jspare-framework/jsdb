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

import java.util.Optional;

import org.jspare.core.container.Component;
import org.jspare.jsdbc.exception.JsdbcException;
import org.jspare.jsdbc.model.Credential;
import org.jspare.jsdbc.model.DataSource;
import org.jspare.jsdbc.model.Domain;

/**
 * The Interface JsdbcTransport.
 *
 * @author pflima
 * @since 04/05/2016
 */
@Component
public interface JsdbcTransport {

	/** The retrieve. */
	int RETRIEVE = 0;
	
	/** The send. */
	int SEND = 1;

	/**
	 * Execute.
	 *
	 * @param datasource
	 *            the datasource
	 * @param credentials
	 *            the credentials
	 * @param domain
	 *            the domain
	 * @param operation
	 *            the operation
	 * @param method
	 *            the method
	 * @param data
	 *            the data
	 * @return the string
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	String execute(DataSource datasource, Credential credentials, Optional<Domain> domain, String operation, int method, String data)
			throws JsdbcException;
}
