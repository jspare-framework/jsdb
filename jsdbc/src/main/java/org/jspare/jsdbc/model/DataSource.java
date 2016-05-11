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
package org.jspare.jsdbc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class DataSource.
 *
 * @author pflima
 * @since 11/05/2016
 */
/* (non-Javadoc)
 * @see java.lang.Object#toString()
 */

/* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
@Data

/**
 * Instantiates a new data source.
 */

/**
 * Instantiates a new data source.
 */
@NoArgsConstructor

/**
 * Instantiates a new data source.
 *
 * @param instance
 *            the instance
 * @param host
 *            the host
 * @param port
 *            the port
 */

/**
 * Instantiates a new data source.
 *
 * @param instance
 *            the instance
 * @param host
 *            the host
 * @param port
 *            the port
 */
@AllArgsConstructor
public class DataSource {

	/** The instance. */
	private String instance;
	
	/** The host. */
	private String host;
	
	/** The port. */
	private Integer port;

	/**
	 * Of.
	 *
	 * @param instance
	 *            the instance
	 * @param host
	 *            the host
	 * @param port
	 *            the port
	 * @return the data source
	 */
	public static DataSource of(String instance, String host, Integer port) {

		return new DataSource(instance, host, port);
	}
}
