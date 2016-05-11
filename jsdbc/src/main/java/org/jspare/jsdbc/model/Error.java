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
import lombok.Getter;

/**
 * Instantiates a new error.
 *
 * @param name
 *            the name
 * @param message
 *            the message
 */

/**
 * Instantiates a new error.
 *
 * @param name
 *            the name
 * @param message
 *            the message
 */
@AllArgsConstructor
public class Error {

	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	
	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	@Getter
	private final String name;
	
	/**
	 * Gets the message.
	 *
	 * @return the message
	 */
	
	/**
	 * Gets the message.
	 *
	 * @return the message
	 */
	@Getter
	private final String message;
}
