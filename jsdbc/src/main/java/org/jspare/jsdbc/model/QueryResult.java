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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jspare.core.exception.SerializationException;

/**
 * The Class QueryResult.
 *
 * @author pflima
 * @param <T>
 *            the generic type
 * @since 04/05/2016
 */
public class QueryResult<T> extends Result {

	/** The result map. */
	private Map<String, ?> resultMap;
	
	/** The single result. */
	private T singleResult;

	/**
	 * Instantiates a new query result.
	 *
	 * @param status
	 *            the status
	 * @param timestamp
	 *            the timestamp
	 * @param tid
	 *            the tid
	 * @param result
	 *            the result
	 * @throws SerializationException
	 *             the serialization exception
	 */
	@SuppressWarnings("unchecked")
	public QueryResult(Status status, LocalDateTime timestamp, String tid, Map<String, Object> result) throws SerializationException {

		super(status, timestamp, tid);
		this.resultMap = result;
		if (result.size() == 1) {

			this.singleResult = (T) result.values().iterator().next();
		}
	}

	/**
	 * Instantiates a new query result.
	 *
	 * @param status
	 *            the status
	 * @param timestamp
	 *            the timestamp
	 * @param tid
	 *            the tid
	 * @param singleResult
	 *            the single result
	 * @throws SerializationException
	 *             the serialization exception
	 */
	public QueryResult(Status status, LocalDateTime timestamp, String tid, T singleResult) throws SerializationException {

		super(status, timestamp, tid);
		this.singleResult = singleResult;
	}

	/**
	 * Gets the result.
	 *
	 * @param key
	 *            the key
	 * @return the result
	 */
	@SuppressWarnings("unchecked")
	public T getResult(String key) {

		return (T) resultMap.get(key);
	};

	/**
	 * Gets the result.
	 *
	 * @return the result
	 */
	public T getResult() {

		return singleResult;
	};

	/**
	 * Result map.
	 *
	 * @return the map
	 */
	@SuppressWarnings("unchecked")
	public Map<String, T> resultMap() {

		Map<String, T> result = new HashMap<>();
		result.putAll((Map<? extends String, ? extends T>) this.resultMap);
		return result;
	};

	/**
	 * List results.
	 *
	 * @return the list
	 */
	@SuppressWarnings("unchecked")
	public List<T> listResults() {

		List<?> list = new ArrayList<>(resultMap.values());
		return (List<T>) list;
	};
}
