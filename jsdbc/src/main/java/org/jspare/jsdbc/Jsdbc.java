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
package org.jspare.jsdbc;

import java.util.List;

import org.jspare.core.container.Component;
import org.jspare.core.container.Scope;
import org.jspare.jsdbc.exception.JsdbcException;
import org.jspare.jsdbc.model.CountResult;
import org.jspare.jsdbc.model.Credential;
import org.jspare.jsdbc.model.DataSource;
import org.jspare.jsdbc.model.Domain;
import org.jspare.jsdbc.model.Instance;
import org.jspare.jsdbc.model.ListDomainsResult;
import org.jspare.jsdbc.model.ListInstancesResult;
import org.jspare.jsdbc.model.Query;
import org.jspare.jsdbc.model.QueryResult;
import org.jspare.jsdbc.model.Result;
import org.jspare.jsdbc.model.StatusResult;
import org.jspare.jsdbc.model.User;

/**
 * The Interface Jsdbc.
 *
 * @author pflima
 * @since 04/05/2016
 */
@Component(scope = Scope.FACTORY)
public interface Jsdbc {

	/**
	 * Count.
	 *
	 * @param query
	 *            the query
	 * @return the count result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	CountResult count(Query query) throws JsdbcException;

	/**
	 * Credential.
	 *
	 * @param credential
	 *            the credential
	 * @return the jsdbc
	 */
	Jsdbc credential(Credential credential);

	/**
	 * Data source.
	 *
	 * @param datasource
	 *            the datasource
	 * @return the jsdbc
	 */
	Jsdbc dataSource(DataSource datasource);

	/**
	 * Status.
	 *
	 * @return the status result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	StatusResult status() throws JsdbcException;

	/**
	 * Creates the instance.
	 *
	 * @param instance
	 *            the instance
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result createInstance(Instance instance) throws JsdbcException;

	/**
	 * Removes the instance.
	 *
	 * @param instance
	 *            the instance
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result removeInstance(Instance instance) throws JsdbcException;

	/**
	 * List instances.
	 *
	 * @return the list instances result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	ListInstancesResult listInstances() throws JsdbcException;

	/**
	 * Creates the user.
	 *
	 * @param user
	 *            the user
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result createUser(User user) throws JsdbcException;

	/**
	 * Removes the user.
	 *
	 * @param key
	 *            the key
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result removeUser(String key) throws JsdbcException;

	/**
	 * Gets the user.
	 *
	 * @param key
	 *            the key
	 * @return the user
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	User getUser(String key) throws JsdbcException;

	/**
	 * List users.
	 *
	 * @return the list
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	List<User> listUsers() throws JsdbcException;

	/**
	 * Creates the domain.
	 *
	 * @param domain
	 *            the domain
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result createDomain(Domain domain) throws JsdbcException;

	/**
	 * Removes the domain.
	 *
	 * @param domain
	 *            the domain
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result removeDomain(Domain domain) throws JsdbcException;

	/**
	 * List domains.
	 *
	 * @return the list domains result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	ListDomainsResult listDomains() throws JsdbcException;

	/**
	 * Persist.
	 *
	 * @param domain
	 *            the domain
	 * @param key
	 *            the key
	 * @param data
	 *            the data
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result persist(Domain domain, String key, Object data) throws JsdbcException;

	/**
	 * Persist.
	 *
	 * @param entity
	 *            the entity
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result persist(Object entity) throws JsdbcException;

	/**
	 * Persist.
	 *
	 * @param domain
	 *            the domain
	 * @param entities
	 *            the entities
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result persist(Domain domain, List<?> entities) throws JsdbcException;

	/**
	 * Removes the.
	 *
	 * @param entity
	 *            the entity
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result remove(Object entity) throws JsdbcException;

	/**
	 * Removes the.
	 *
	 * @param domain
	 *            the domain
	 * @param key
	 *            the key
	 * @return the result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	Result remove(Domain domain, String key) throws JsdbcException;

	/**
	 * Query for.
	 *
	 * @param <T>
	 *            the generic type
	 * @param query
	 *            the query
	 * @return the query result
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	<T> QueryResult<T> queryFor(Query query) throws JsdbcException;
}