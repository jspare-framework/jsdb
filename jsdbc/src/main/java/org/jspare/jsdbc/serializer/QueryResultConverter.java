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
package org.jspare.jsdbc.serializer;

import static org.jspare.core.container.Environment.my;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import org.jspare.core.exception.SerializationException;
import org.jspare.core.serializer.JsonConverter;
import org.jspare.core.serializer.Serializer;
import org.jspare.jsdbc.model.QueryResult;
import org.jspare.jsdbc.model.Status;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;

/**
 * The Class QueryResultConverter.
 *
 * @author pflima
 * @since 04/05/2016
 */
public class QueryResultConverter implements JsonConverter {

	/** The Constant STATUS. */
	private static final String STATUS = "status";
	
	/** The Constant TIMESTAMP. */
	private static final String TIMESTAMP = "timestamp";
	
	/** The Constant TID. */
	private static final String TID = "tid";
	
	/** The Constant RESULT. */
	private static final String RESULT = "result";
	
	/** The Constant WORKERS. */
	private static final int WORKERS = 5;

	/** The entity clazz. */
	private final Class<?> entityClazz;

	/**
	 * Instantiates a new query result converter.
	 *
	 * @param entity
	 *            the entity
	 */
	public QueryResultConverter(Class<?> entity) {
		this.entityClazz = entity;
	}

	/* (non-Javadoc)
	 * @see org.jspare.core.serializer.JsonConverter#getType()
	 */
	@Override
	public Type getType() {

		return QueryResult.class;
	}

	/* (non-Javadoc)
	 * @see org.jspare.core.serializer.JsonConverter#getAdapter()
	 */
	@Override
	public Object getAdapter() {

		return new QueryResultAdapter();
	}

	/**
	 * The Class QueryResultAdapter.
	 *
	 * @author pflima
	 * @since 04/05/2016
	 */
	class QueryResultAdapter implements JsonDeserializer<QueryResult<?>> {

		/* (non-Javadoc)
		 * @see com.google.gson.JsonDeserializer#deserialize(com.google.gson.JsonElement, java.lang.reflect.Type, com.google.gson.JsonDeserializationContext)
		 */
		@Override
		public QueryResult<?> deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {

			JsonObject result = json.getAsJsonObject();

			try {

				Status status = my(Serializer.class).fromJSON(result.get(STATUS), Status.class);
				LocalDateTime timestamp = my(Serializer.class).fromJSON(result.get(TIMESTAMP), LocalDateTime.class);
				String tid = result.get(TID).getAsString();

				QueryResult<?> queryResult = null;
				if (isValidResult(result)) {
					int size = result.get(RESULT).getAsJsonObject().entrySet().size();
					Map<String, Object> results = new ConcurrentHashMap<>(size);

					Executor executor = Executors.newFixedThreadPool(WORKERS);
					CompletableFuture<?>[] completableFutures = new CompletableFuture[size];

					int i = 0;
					for (Entry<String, JsonElement> entry : result.get(RESULT).getAsJsonObject().entrySet()) {
						completableFutures[i] = parseObjectResponse(results, entry, executor);
						i++;
					}

					CompletableFuture.allOf(completableFutures).join();
					queryResult = new QueryResult<>(status, timestamp, tid, results);
				}

				return queryResult;

			} catch (SerializationException e) {

				throw new JsonParseException(e);
			}
		}

		/**
		 * Checks if is valid result.
		 *
		 * @param result
		 *            the result
		 * @return true, if is valid result
		 */
		private boolean isValidResult(JsonObject result) {
			return result.get(RESULT) != null && !result.get(RESULT).isJsonNull();
		}

		/**
		 * Parses the object response.
		 *
		 * @param results
		 *            the results
		 * @param entry
		 *            the entry
		 * @param executor
		 *            the executor
		 * @return the completable future
		 */
		private CompletableFuture<Map<String, Object>> parseObjectResponse(Map<String, Object> results, Entry<String, JsonElement> entry,
				Executor executor) {

			return CompletableFuture.supplyAsync(() -> {
				try {

					Object value = my(Serializer.class).fromJSON(entry.getValue(), entityClazz);
					results.put(entry.getKey(), value);
				} catch (Exception e) {
					e.printStackTrace();
				}
				return results;
			}, executor);
		}
	}
}