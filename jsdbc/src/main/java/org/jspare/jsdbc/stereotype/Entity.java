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
package org.jspare.jsdbc.stereotype;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.apache.commons.lang.StringUtils;

/**
 * The Interface Entity.
 *
 * @author pflima
 * @since 04/05/2016
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE })
public @interface Entity {

	/**
	 * Domain.
	 *
	 * @return the string
	 */
	public abstract String domain();

	/**
	 * Auto generate key.
	 *
	 * @return true, if successful
	 */
	public abstract boolean autoGenerateKey() default false;
	
	/**
	 * Key.
	 *
	 * @return the string
	 */
	public abstract String key() default StringUtils.EMPTY;
}
