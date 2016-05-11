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
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * The Class ListDomainsResult.
 *
 * @author pflima
 * @since 04/05/2016
 */
public class ListDomainsResult extends Result {

	/**
	 * Gets the result.
	 *
	 * @return the result
	 */
	
	/**
	 * Gets the result.
	 *
	 * @return the result
	 */
	@Getter
	private ListDomain result;

	/**
	 * Instantiates a new list domains result.
	 *
	 * @param status
	 *            the status
	 * @param timestamp
	 *            the timestamp
	 * @param tid
	 *            the tid
	 * @param result
	 *            the result
	 */
	public ListDomainsResult(Status status, LocalDateTime timestamp, String tid, ListDomain result) {
		super(status, timestamp, tid);
		this.result = result;
	}

	/**
	 * Instantiates a new list domain.
	 *
	 * @param instance
	 *            the instance
	 * @param domains
	 *            the domains
	 */
	
	/**
	 * Instantiates a new list domain.
	 *
	 * @param instance
	 *            the instance
	 * @param domains
	 *            the domains
	 */
	@AllArgsConstructor
	public static class ListDomain {

		/**
		 * Gets the single instance of ListDomain.
		 *
		 * @return single instance of ListDomain
		 */
		
		/**
		 * Gets the single instance of ListDomain.
		 *
		 * @return single instance of ListDomain
		 */
		@Getter
		private String instance;

		/**
		 * Gets the domains.
		 *
		 * @return the domains
		 */
		
		/**
		 * Gets the domains.
		 *
		 * @return the domains
		 */
		@Getter
		private List<String> domains;
	}
}
