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

import java.util.Map;

import org.jspare.jsdbc.exception.JsdbcException;
import org.jspare.jsdbc.stereotype.Entity;
import org.jspare.jsdbc.stereotype.EntityUtils;

import lombok.Data;

/**
 * Instantiates a new query.
 */

/**
 * Instantiates a new query.
 */
@Data
public class Query {

	/** The filter. */
	private final Filter filter = new Filter();

	/** The domain. */
	private Domain domain;

	/**
	 * Of.
	 *
	 * @param clazz
	 *            the clazz
	 * @return the query
	 */
	public static Query of(Class<?> clazz) {

		return new Query().forEntity(clazz);
	}

	/**
	 * For domain.
	 *
	 * @param domain
	 *            the domain
	 * @param target
	 *            the target
	 * @return the query
	 */
	public Query forDomain(Domain domain, Class<?> target) {

		this.domain = domain.clazzDomain(target);
		return this;
	}

	/**
	 * For entity.
	 *
	 * @param clazz
	 *            the clazz
	 * @return the query
	 */
	public Query forEntity(Class<?> clazz) {

		if (EntityUtils.isEntityData(clazz)) {

			Entity entity = clazz.getAnnotation(Entity.class);
			this.domain = Domain.of(entity.domain()).clazzDomain(clazz);
		}
		return this;
	}

	/**
	 * For entity.
	 *
	 * @param data
	 *            the data
	 * @return the query
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	public Query forEntity(Object data) throws JsdbcException {

		if (EntityUtils.isEntityData(data)) {
			Entity entity = data.getClass().getAnnotation(Entity.class);
			this.domain = Domain.of(entity.domain()).clazzDomain(data.getClass());
			return byKey(EntityUtils.findKeyByEntity(entity, data));
		}
		return this;
	}

	/**
	 * Where.
	 *
	 * @param condition
	 *            the condition
	 * @return the query
	 */
	public Query where(Condition condition) {
		this.filter.getConditions().add(condition);
		return this;
	}

	/**
	 * Where.
	 *
	 * @param parameters
	 *            the parameters
	 * @return the query
	 */
	public Query where(Map<String, String> parameters) {
		this.filter.getWhere().putAll(parameters);
		return this;
	}

	/**
	 * Where.
	 *
	 * @param key
	 *            the key
	 * @param value
	 *            the value
	 * @return the query
	 */
	public Query where(String key, String value) {
		this.filter.getWhere().put(key, value);
		return this;
	}

	/**
	 * Select.
	 *
	 * @param select
	 *            the select
	 * @return the query
	 */
	public Query select(String select) {
		this.filter.select(select);
		return this;
	}

	/**
	 * By key.
	 *
	 * @param key
	 *            the key
	 * @return the query
	 */
	public Query byKey(String key) {
		this.filter.byKey(key);
		return this;
	}
}