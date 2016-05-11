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

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * The Class Result.
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
 * Instantiates a new result.
 *
 * @param status
 *            the status
 * @param timestamp
 *            the timestamp
 * @param tid
 *            the tid
 */

/**
 * Instantiates a new result.
 *
 * @param status
 *            the status
 * @param timestamp
 *            the timestamp
 * @param tid
 *            the tid
 */
@AllArgsConstructor
public class Result {

	/** The status. */
	private Status status;
	
	/** The timestamp. */
	private LocalDateTime timestamp;
	
	/** The tid. */
	private String tid;
}