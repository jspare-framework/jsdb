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

import java.time.LocalDateTime;

import org.jspare.core.exception.SerializationException;

import lombok.Getter;

/**
 * The Class CountResult.
 *
 * @author pflima
 * @since 04/05/2016
 */
public class CountResult extends Result {

	/**
	 * Gets the count.
	 *
	 * @return the count
	 */
	
	/**
	 * Gets the count.
	 *
	 * @return the count
	 */
	@Getter
	private final Integer count;

	/**
	 * Instantiates a new count result.
	 *
	 * @param status
	 *            the status
	 * @param timestamp
	 *            the timestamp
	 * @param tid
	 *            the tid
	 * @param count
	 *            the count
	 * @throws SerializationException
	 *             the serialization exception
	 */
	public CountResult(Status status, LocalDateTime timestamp, String tid, int count) throws SerializationException {

		super(status, timestamp, tid);
		this.count = count;
	}
}
