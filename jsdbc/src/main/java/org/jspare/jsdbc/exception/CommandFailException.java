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
package org.jspare.jsdbc.exception;

import org.jspare.jsdbc.model.ErrorResult;

import lombok.Getter;

/**
 * 
 * 
 * @author pflima
 * @since 05/10/2015
 */
public class CommandFailException extends JsdbcException {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -4866461153823513128L;

	/**
	 * Gets the error.
	 *
	 * @return the error
	 */
	
	/**
	 * Gets the error.
	 *
	 * @return the error
	 */
	@Getter
	private ErrorResult error;

	/**
	 * Instantiates a new command fail exception.
	 *
	 * @param error
	 *            the error
	 */
	public CommandFailException(ErrorResult error) {
		super(error.getResult().getMessage());
		this.error = error;
	}
}