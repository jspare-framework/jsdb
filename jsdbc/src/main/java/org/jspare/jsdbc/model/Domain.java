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

import org.jspare.core.exception.InfraRuntimeException;
import org.jspare.jsdbc.stereotype.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Accessors;

/**
 * The Class Domain.
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
@Accessors(fluent = true)

/**
 * Instantiates a new domain.
 *
 * @param domain
 *            the domain
 */

/**
 * Instantiates a new domain.
 *
 * @param domain
 *            the domain
 */
@RequiredArgsConstructor

/**
 * Instantiates a new domain.
 *
 * @param domain
 *            the domain
 * @param clazzDomain
 *            the clazz domain
 */

/**
 * Instantiates a new domain.
 *
 * @param domain
 *            the domain
 * @param clazzDomain
 *            the clazz domain
 */
@AllArgsConstructor
public class Domain {

	/** The domain. */
	private final String domain;

	/** The clazz domain. */
	private transient Class<?> clazzDomain;

	/**
	 * Of.
	 *
	 * @param domain
	 *            the domain
	 * @return the domain
	 */
	public static Domain of(String domain) {

		return new Domain(domain);
	}

	/**
	 * Of.
	 *
	 * @param entityClazz
	 *            the entity clazz
	 * @return the domain
	 */
	public static Domain of(Class<?> entityClazz) {

		if (!entityClazz.isAnnotationPresent(Entity.class)) {

			throw new InfraRuntimeException("Cannot retrieve domain of not entity class.");
		}

		return new Domain(entityClazz.getAnnotation(Entity.class).domain(), entityClazz);
	}
}
