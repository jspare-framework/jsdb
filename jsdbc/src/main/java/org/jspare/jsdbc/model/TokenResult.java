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

import lombok.Getter;

/**
 * The Class TokenResult.
 *
 * @author pflima
 * @since 04/05/2016
 */
public class TokenResult extends Result {

	/**
	 * Instantiates a new token result.
	 *
	 * @param status
	 *            the status
	 * @param timestamp
	 *            the timestamp
	 * @param tid
	 *            the tid
	 */
	public TokenResult(Status status, LocalDateTime timestamp, String tid) {
		super(status, timestamp, tid);
	}

	/**
	 * Gets the token.
	 *
	 * @return the token
	 */
	
	/**
	 * Gets the token.
	 *
	 * @return the token
	 */
	@Getter
	private String token;

}