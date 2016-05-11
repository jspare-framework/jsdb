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
 * The Class ListInstancesResult.
 *
 * @author pflima
 * @since 04/05/2016
 */
public class ListInstancesResult extends Result {

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
	private ListInstances result;

	/**
	 * Instantiates a new list instances result.
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
	public ListInstancesResult(Status status, LocalDateTime timestamp, String tid, ListInstances result) {
		super(status, timestamp, tid);
		this.result = result;
	}

	/**
	 * Instantiates a new list instances.
	 *
	 * @param instances
	 *            the instances
	 */
	
	/**
	 * Instantiates a new list instances.
	 *
	 * @param instances
	 *            the instances
	 */
	@AllArgsConstructor
	public static class ListInstances {

		/**
		 * Gets the instances.
		 *
		 * @return the instances
		 */
		
		/**
		 * Gets the instances.
		 *
		 * @return the instances
		 */
		@Getter
		private List<String> instances;
	}
}
