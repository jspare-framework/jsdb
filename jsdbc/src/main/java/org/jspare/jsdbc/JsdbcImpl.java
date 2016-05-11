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

import static org.jspare.core.container.Environment.my;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.lang.StringUtils;
import org.jspare.core.exception.SerializationException;
import org.jspare.core.serializer.Serializer;
import org.jspare.jsdbc.exception.JsdbcException;
import org.jspare.jsdbc.model.CountResult;
import org.jspare.jsdbc.model.Credential;
import org.jspare.jsdbc.model.DataSource;
import org.jspare.jsdbc.model.Domain;
import org.jspare.jsdbc.model.Instance;
import org.jspare.jsdbc.model.ListDomainsResult;
import org.jspare.jsdbc.model.ListInstancesResult;
import org.jspare.jsdbc.model.PersistBatchRequest;
import org.jspare.jsdbc.model.PersistRequest;
import org.jspare.jsdbc.model.Query;
import org.jspare.jsdbc.model.QueryRequest;
import org.jspare.jsdbc.model.QueryResult;
import org.jspare.jsdbc.model.RemoveRequest;
import org.jspare.jsdbc.model.Result;
import org.jspare.jsdbc.model.StatusResult;
import org.jspare.jsdbc.model.User;
import org.jspare.jsdbc.serializer.QueryResultConverter;
import org.jspare.jsdbc.stereotype.Entity;
import org.jspare.jsdbc.stereotype.EntityUtils;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

/**
 * The Class JsdbcImpl.
 *
 * @author pflima
 * @since 04/05/2016
 */
public class JsdbcImpl implements Jsdbc {

	/** The Constant OPER_STATUS. */
	private static final String OPER_STATUS = "/environment/status";

	/** The Constant OPER_CREATE_INSTANCE. */
	private static final String OPER_CREATE_INSTANCE = "/instance/:instance/add";

	/** The Constant OPER_REMOVE_INSTANCE. */
	private static final String OPER_REMOVE_INSTANCE = "/instance/:instance/remove";

	/** The Constant OPER_LIST_INSTANCES. */
	private static final String OPER_LIST_INSTANCES = "/instance/list";

	/** The Constant OPER_CREATE_USER. */
	private static final String OPER_CREATE_USER = "/security/user/add";

	/** The Constant OPER_REMOVE_USER. */
	private static final String OPER_REMOVE_USER = "/security/user/:user/remove";

	/** The Constant OPER_GET_USER. */
	private static final String OPER_GET_USER = "/security/user/:user";

	/** The Constant OPER_LIST_USERS. */
	private static final String OPER_LIST_USERS = "/security/users";

	/** The Constant OPER_CREATE_DOMAIN. */
	private static final String OPER_CREATE_DOMAIN = "/instance/:instance/domain/:domain/add";

	/** The Constant OPER_REMOVE_DOMAIN. */
	private static final String OPER_REMOVE_DOMAIN = "/instance/:instance/domain/:domain/remove";

	/** The Constant OPER_LIST_DOMAIN. */
	private static final String OPER_LIST_DOMAIN = "/instance/:instance/domain/list";

	/** The Constant OPER_PERSIST. */
	private static final String OPER_PERSIST = "/instance/:instance/domain/:domain/data/persist";

	/** The Constant OPER_PERSIST_BATCH. */
	private static final String OPER_PERSIST_BATCH = "/instance/:instance/domain/:domain/data/persistBatch";

	/** The Constant OPER_REMOVE. */
	private static final String OPER_REMOVE = "/instance/:instance/domain/:domain/data/remove";

	/** The Constant OPER_QUERY. */
	private static final String OPER_QUERY = "/instance/:instance/domain/:domain/data/query";

	/** The Constant OPER_COUNT. */
	private static final String OPER_COUNT = "/instance/:instance/domain/:domain/data/count";

	/** The credential. */
	private Credential credential;

	/** The datasource. */
	private DataSource datasource;

	/** The serializer. */
	private Serializer serializer;

	/** The transport. */
	private JsdbcTransport transport;

	/**
	 * Instantiates a new jsdbc impl.
	 */
	public JsdbcImpl() {

		this.serializer = my(Serializer.class);
		this.transport = my(JsdbcTransport.class);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#count(org.jspare.jsdbc.model.Query)
	 */
	@Override
	public CountResult count(Query query) throws JsdbcException {

		if (query.getDomain() == null) {

			throw new JsdbcException("Domain not informed");
		}

		try {

			QueryRequest queryRequest = new QueryRequest(query.getDomain().domain(), query.getFilter());
			String parameters = serializer.toJSON(queryRequest);

			String result = callJsdbServer(OPER_COUNT, JsdbcTransport.SEND, Optional.empty(), parameters);
			return serializer.fromJSON(result, CountResult.class);

		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#status()
	 */
	@Override
	public StatusResult status() throws JsdbcException {

		try {

			String result = callJsdbServer(OPER_STATUS, JsdbcTransport.RETRIEVE, Optional.empty(), StringUtils.EMPTY);
			return serializer.fromJSON(result, StatusResult.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#createUser(org.jspare.jsdbc.model.User)
	 */
	@Override
	public Result createUser(User user) throws JsdbcException {
		try {

			String req = serializer.toJSON(user);

			String result = callJsdbServer(OPER_CREATE_USER, JsdbcTransport.SEND, Optional.empty(), req);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.jspare.jsdbc.Jsdbc#createInstance(org.jspare.jsdbc.model.Instance)
	 */
	@Override
	public Result createInstance(Instance instance) throws JsdbcException {
		try {

			String url = OPER_CREATE_INSTANCE.replace(":instance", instance.getValue());

			String result = callJsdbServer(url, JsdbcTransport.SEND, Optional.empty(), StringUtils.EMPTY);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.jspare.jsdbc.Jsdbc#removeInstance(org.jspare.jsdbc.model.Instance)
	 */
	@Override
	public Result removeInstance(Instance instance) throws JsdbcException {
		try {

			String url = OPER_REMOVE_INSTANCE.replace(":instance", instance.getValue());

			String result = callJsdbServer(url, JsdbcTransport.SEND, Optional.empty(), StringUtils.EMPTY);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#listInstances()
	 */
	@Override
	public ListInstancesResult listInstances() throws JsdbcException {
		try {

			String content = callJsdbServer(OPER_LIST_INSTANCES, JsdbcTransport.RETRIEVE, Optional.empty(), StringUtils.EMPTY);
			ListInstancesResult result = my(Serializer.class).fromJSON(content, ListInstancesResult.class);
			return result;
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#removeUser(java.lang.String)
	 */
	@Override
	public Result removeUser(String key) throws JsdbcException {
		try {

			String result = callJsdbServer(OPER_REMOVE_USER.replace(":user", key), JsdbcTransport.SEND, Optional.empty(),
					StringUtils.EMPTY);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#getUser(java.lang.String)
	 */
	@Override
	public User getUser(String key) throws JsdbcException {
		try {

			String content = callJsdbServer(OPER_GET_USER.replace(":user", key), JsdbcTransport.RETRIEVE, Optional.empty(),
					StringUtils.EMPTY);
			JsonElement result = new JsonParser().parse(content);
			return serializer.fromJSON(result.getAsJsonObject().get("result"), User.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#listUsers()
	 */
	@Override
	public List<User> listUsers() throws JsdbcException {
		try {

			String content = callJsdbServer(OPER_LIST_USERS, JsdbcTransport.RETRIEVE, Optional.empty(), StringUtils.EMPTY);
			JsonElement result = new JsonParser().parse(content);
			Map<String, User> users = serializer.fromJSON(result.getAsJsonObject().get("result"), new TypeToken<Map<String, User>>() {
			}.getType());
			return new ArrayList<>(users.values());
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#createDomain(org.jspare.jsdbc.model.Domain)
	 */
	@Override
	public Result createDomain(Domain domain) throws JsdbcException {
		try {

			String req = serializer.toJSON(domain);

			String result = callJsdbServer(OPER_CREATE_DOMAIN, JsdbcTransport.SEND, Optional.of(domain), req);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#removeDomain(org.jspare.jsdbc.model.Domain)
	 */
	@Override
	public Result removeDomain(Domain domain) throws JsdbcException {
		try {

			String req = serializer.toJSON(domain);

			String result = callJsdbServer(OPER_REMOVE_DOMAIN, JsdbcTransport.SEND, Optional.of(domain), req);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#listDomains()
	 */
	@Override
	public ListDomainsResult listDomains() throws JsdbcException {
		try {

			String content = callJsdbServer(OPER_LIST_DOMAIN, JsdbcTransport.RETRIEVE, Optional.empty(), StringUtils.EMPTY);
			ListDomainsResult result = my(Serializer.class).fromJSON(content, ListDomainsResult.class);
			return result;
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#queryFor(org.jspare.jsdbc.model.Query)
	 */
	@Override
	@SuppressWarnings({ "unchecked" })
	public <T> QueryResult<T> queryFor(Query query) throws JsdbcException {

		if (query.getDomain() == null) {

			throw new JsdbcException("Domain not informed");
		}

		try {

			QueryRequest queryRequest = new QueryRequest(query.getDomain().domain(), query.getFilter());
			String parameters = serializer.toJSON(queryRequest.getFilter());
			String content = callJsdbServer(OPER_QUERY, JsdbcTransport.SEND, Optional.of(query.getDomain()), parameters);

			JsonElement result = new JsonParser().parse(content);

			return serializer.registryJsonConverter(new QueryResultConverter(query.getDomain().clazzDomain())).fromJSON(result,
					QueryResult.class);

		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#persist(org.jspare.jsdbc.model.Domain,
	 * java.lang.String, java.lang.Object)
	 */
	@Override
	public Result persist(Domain domain, String key, Object data) throws JsdbcException {
		try {

			PersistRequest request = new PersistRequest(domain.domain(), key, data);

			String req = serializer.toJSON(request);

			String result = callJsdbServer(OPER_PERSIST, JsdbcTransport.SEND, Optional.of(domain), req);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#persist(java.lang.Object)
	 */
	@Override
	public Result persist(Object data) throws JsdbcException {
		try {
			Class<?> clazz = data.getClass();
			if (!clazz.isAnnotationPresent(Entity.class)) {

				throw new JsdbcException(String.format("Not found annotation @Entity on class [%s]", clazz.getName()));
			}

			Entity entity = data.getClass().getAnnotation(Entity.class);

			String domain = entity.domain();
			String key = EntityUtils.findKeyByEntity(entity, data);

			PersistRequest request = new PersistRequest(domain, key, data);

			String req = serializer.toJSON(request);

			String result = callJsdbServer(OPER_PERSIST, JsdbcTransport.SEND, Optional.of(Domain.of(entity.domain())), req);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#persist(org.jspare.jsdbc.model.Domain,
	 * java.util.List)
	 */
	@Override
	public Result persist(Domain domain, List<?> entities) throws JsdbcException {

		Map<String, Object> data = new HashMap<>();

		try {

			for (Object obj : entities) {
				Class<?> clazz = obj.getClass();
				if (!clazz.isAnnotationPresent(Entity.class)) {

					throw new JsdbcException(String.format("Not found annotation @Entity on class [%s]", clazz.getName()));
				}

				Entity entity = obj.getClass().getAnnotation(Entity.class);
				String key = EntityUtils.findKeyByEntity(entity, obj);
				data.put(key, obj);
			}

			PersistBatchRequest request = new PersistBatchRequest(data);

			String req = serializer.toJSON(request.getEntities());

			String result = callJsdbServer(OPER_PERSIST_BATCH, JsdbcTransport.SEND, Optional.of(domain), req);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#remove(java.lang.Object)
	 */
	@Override
	public Result remove(Object data) throws JsdbcException {
		try {
			Class<?> clazz = data.getClass();
			if (!EntityUtils.isEntityData(data)) {

				throw new JsdbcException(String.format("Not found annotation @Entity on class [%s]", clazz.getName()));
			}

			Entity entity = data.getClass().getAnnotation(Entity.class);

			String domain = entity.domain();
			String key = EntityUtils.findKeyByEntity(entity, data);

			RemoveRequest request = new RemoveRequest(domain, key);

			String req = serializer.toJSON(request);

			String result = callJsdbServer(OPER_REMOVE, JsdbcTransport.SEND, Optional.of(Domain.of(domain)), req);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#remove(org.jspare.jsdbc.model.Domain,
	 * java.lang.String)
	 */
	@Override
	public Result remove(Domain domain, String key) throws JsdbcException {
		try {

			RemoveRequest request = new RemoveRequest(domain.domain(), key);

			String req = serializer.toJSON(request);

			String result = callJsdbServer(OPER_REMOVE, JsdbcTransport.SEND, Optional.of(domain), req);
			return serializer.fromJSON(result, Result.class);
		} catch (SerializationException e) {

			throw new JsdbcException("Fail on parse result");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#credential(org.jspare.jsdbc.model.Credential)
	 */
	@Override
	public Jsdbc credential(Credential credential) {
		this.credential = credential;
		return this;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.jspare.jsdbc.Jsdbc#dataSource(org.jspare.jsdbc.model.DataSource)
	 */
	@Override
	public Jsdbc dataSource(DataSource datasource) {
		this.datasource = datasource;
		return this;
	}

	/**
	 * Call jsdb server.
	 *
	 * @param operation
	 *            the operation
	 * @param method
	 *            the method
	 * @param domain
	 *            the domain
	 * @param data
	 *            the data
	 * @return the string
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	private String callJsdbServer(String operation, int method, Optional<Domain> domain, String data) throws JsdbcException {

		return transport.execute(datasource, credential, domain, operation, method, data);
	}
}