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

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * The Class StatusResult.
 *
 * @author pflima
 * @since 11/05/2016
 */
/* (non-Javadoc)
 * @see org.jspare.jsdbc.model.Result#toString()
 */

/* (non-Javadoc)
 * @see org.jspare.jsdbc.model.Result#toString()
 */
@Data

/* (non-Javadoc)
 * @see org.jspare.jsdbc.model.Result#hashCode()
 */

/* (non-Javadoc)
 * @see org.jspare.jsdbc.model.Result#hashCode()
 */
@EqualsAndHashCode(callSuper = false)
public class StatusResult extends Result {

	/**
	 * Instantiates a new status result.
	 *
	 * @param status
	 *            the status
	 * @param timestamp
	 *            the timestamp
	 * @param tid
	 *            the tid
	 * @param state
	 *            the state
	 * @param started
	 *            the started
	 */
	public StatusResult(Status status, LocalDateTime timestamp, String tid, String state, LocalDateTime started) {
		super(status, timestamp, tid);
		this.state = state;
		this.started = started;
	}

	/** The state. */
	private String state;
	
	/** The started. */
	private LocalDateTime started;
}
