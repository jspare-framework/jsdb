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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.jspare.core.exception.SerializationException;
import org.jspare.jsdbc.exception.CommandFailException;
import org.jspare.jsdbc.exception.JsdbcException;
import org.jspare.jsdbc.model.CountResult;
import org.jspare.jsdbc.model.Credential;
import org.jspare.jsdbc.model.DataSource;
import org.jspare.jsdbc.model.Domain;
import org.jspare.jsdbc.model.Error;
import org.jspare.jsdbc.model.ErrorResult;
import org.jspare.jsdbc.model.Instance;
import org.jspare.jsdbc.model.ListDomainsResult;
import org.jspare.jsdbc.model.ListInstancesResult;
import org.jspare.jsdbc.model.Query;
import org.jspare.jsdbc.model.QueryResult;
import org.jspare.jsdbc.model.Result;
import org.jspare.jsdbc.model.Status;
import org.jspare.jsdbc.model.StatusResult;
import org.jspare.jsdbc.model.User;
import org.jspare.jsdbc.stereotype.Entity;
import org.jspare.jsdbc.stereotype.EntityUtils;

/**
 * The Class JsdbcMockedImpl.
 *
 * @author pflima
 * @since 04/05/2016
 */
public class JsdbcMockedImpl implements Jsdbc {

	/** The instances. */
	private List<String> instances = new ArrayList<>();

	/** The users. */
	private Map<String, User> users = new HashMap<>();

	/** The data. */
	private Map<String, Map<String, Object>> data = new HashMap<>();

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#credential(org.jspare.jsdbc.model.Credential)
	 */
	@Override
	public Jsdbc credential(Credential credential) {

		return this;
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#dataSource(org.jspare.jsdbc.model.DataSource)
	 */
	@Override
	public Jsdbc dataSource(DataSource datasource) {

		return this;
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#status()
	 */
	@Override
	public StatusResult status() throws JsdbcException {

		return new StatusResult(Status.SUCCESS, LocalDateTime.now(), "tid", "OK", LocalDateTime.now());
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#createInstance(org.jspare.jsdbc.model.Instance)
	 */
	@Override
	public Result createInstance(Instance instance) throws JsdbcException {

		instances.add(instance.getValue());
		
		return resultSuccess();
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#removeInstance(org.jspare.jsdbc.model.Instance)
	 */
	@Override
	public Result removeInstance(Instance instance) throws JsdbcException, CommandFailException {

		if (!instances.remove(instance.getValue())) {

			throw new CommandFailException(new ErrorResult(Status.FAIL, null, null, new Error("ERROR", "")));
		}
		return resultSuccess();
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#listInstances()
	 */
	@Override
	public ListInstancesResult listInstances() throws JsdbcException {

		return new ListInstancesResult(Status.SUCCESS, LocalDateTime.now(), "tid",
				new ListInstancesResult.ListInstances(instances));
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#createUser(org.jspare.jsdbc.model.User)
	 */
	@Override
	public Result createUser(User user) throws JsdbcException {

		users.put(user.key(), user);

		return resultSuccess();
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#removeUser(java.lang.String)
	 */
	@Override
	public Result removeUser(String key) throws JsdbcException {

		users.remove(key);

		return resultSuccess();
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#getUser(java.lang.String)
	 */
	@Override
	public User getUser(String key) throws JsdbcException {

		return users.get(key);
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#listUsers()
	 */
	@Override
	public List<User> listUsers() throws JsdbcException {

		return new ArrayList<>(users.values());
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#createDomain(org.jspare.jsdbc.model.Domain)
	 */
	@Override
	public Result createDomain(Domain domain) throws JsdbcException {

		if (!data.containsKey(domain.domain())) {
			data.put(domain.domain(), new HashMap<>());
			return resultSuccess();
		}
		return resultFail();
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#removeDomain(org.jspare.jsdbc.model.Domain)
	 */
	@Override
	public Result removeDomain(Domain domain) throws JsdbcException {

		data.remove(domain);

		return resultSuccess();
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#listDomains()
	 */
	@Override
	public ListDomainsResult listDomains() throws JsdbcException {

		List<String> domains = new ArrayList<>();
		data.keySet().forEach(item -> {
			domains.add(item);
		});

		return new ListDomainsResult(Status.SUCCESS, LocalDateTime.now(), "tid",
				new ListDomainsResult.ListDomain(StringUtils.EMPTY, domains));
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#persist(org.jspare.jsdbc.model.Domain, java.lang.String, java.lang.Object)
	 */
	@Override
	public Result persist(Domain domain, String key, Object data) throws JsdbcException {

		if (this.data.containsKey(domain.domain())) {
			this.data.get(domain.domain()).put(key, data);
			return resultSuccess();
		}

		return resultFail();
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#persist(java.lang.Object)
	 */
	@Override
	public Result persist(Object data) throws JsdbcException {

		if (!data.getClass().isAnnotationPresent(Entity.class)) {
			return resultFail();
		}

		Entity entity = data.getClass().getAnnotation(Entity.class);

		return persist(Domain.of(entity.domain()), EntityUtils.findKeyByEntity(entity, data), data);
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#persist(org.jspare.jsdbc.model.Domain, java.util.List)
	 */
	@Override
	public Result persist(Domain domain, List<?> entities) throws JsdbcException {

		for (Object object : entities) {
			persist(object);
		}

		return resultSuccess();
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#remove(java.lang.Object)
	 */
	@Override
	public Result remove(Object data) throws JsdbcException {

		if (!data.getClass().isAnnotationPresent(Entity.class)) {
			return resultFail();
		}

		Entity entity = data.getClass().getAnnotation(Entity.class);
		String domain = entity.domain();
		String key = EntityUtils.findKeyByEntity(entity, data);

		return remove(Domain.of(domain), key);
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#remove(org.jspare.jsdbc.model.Domain, java.lang.String)
	 */
	@Override
	public Result remove(Domain domain, String key) throws JsdbcException {

		if (this.data.containsKey(domain.domain())) {
			this.data.get(domain.domain()).remove(key);
			return resultSuccess();
		}

		return resultFail();
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#queryFor(org.jspare.jsdbc.model.Query)
	 */
	@Override
	public <T> QueryResult<T> queryFor(Query query) throws JsdbcException {

		try {

			Map<String, Object> m = new HashMap<>();
			this.data.entrySet().forEach(es -> {
				try {
					m.put(es.getKey(), es.getValue());
				} catch (Exception e) {
				}
			});

			QueryResult<T> result = new QueryResult<>(Status.SUCCESS, LocalDateTime.now(), "tid", m);
			return result;
		} catch (SerializationException e) {

			throw new JsdbcException(e);
		}
	}

	/**
	 * Result success.
	 *
	 * @return the result
	 */
	private Result resultSuccess() {

		return new Result(Status.SUCCESS, LocalDateTime.now(), "tid");
	}

	/**
	 * Result fail.
	 *
	 * @return the result
	 */
	private Result resultFail() {

		return new Result(Status.FAIL, LocalDateTime.now(), "tid");
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.Jsdbc#count(org.jspare.jsdbc.model.Query)
	 */
	@Override
	public CountResult count(Query query) throws JsdbcException {
		try {
			CountResult result = new CountResult(Status.SUCCESS, LocalDateTime.now(), "tid", 1);
			return result;
		} catch (SerializationException e) {

			throw new JsdbcException(e);
		}
	}
}