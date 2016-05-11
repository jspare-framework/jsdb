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
package org.jspare.jsdbc.collections;

import static org.jspare.core.container.Environment.my;

import java.io.Serializable;
import java.lang.reflect.Type;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.jspare.core.exception.SerializationException;
import org.jspare.core.serializer.Serializer;

import com.google.gson.reflect.TypeToken;

/**
 * The Class ResultMap.
 *
 * @author pflima
 * @param <K>
 *            the key type
 * @param <V>
 *            the value type
 * @since 04/05/2016
 */
public class ResultMap<K, V> extends AbstractMap<K, V> implements Map<K, V>, Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = -8691016413880078756L;

	/** The result map. */
	private ConcurrentMap<K, String> resultMap;

	/**
	 * Instantiates a new result map.
	 *
	 * @param resultMap
	 *            the result map
	 */
	public ResultMap(Map<K, String> resultMap) {

		this.resultMap = new ConcurrentHashMap<>();
		this.resultMap.putAll(resultMap);
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#size()
	 */
	@Override
	public int size() {

		return this.resultMap.size();
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#isEmpty()
	 */
	@Override
	public boolean isEmpty() {

		return this.resultMap.isEmpty();
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#containsKey(java.lang.Object)
	 */
	@Override
	public boolean containsKey(Object key) {

		return this.resultMap.containsKey(key);
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#containsValue(java.lang.Object)
	 */
	@Override
	public boolean containsValue(Object value) {

		return this.resultMap.containsKey(value);
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#get(java.lang.Object)
	 */
	@Override
	public V get(Object key) {

		return convertFromJson(this.resultMap.get(key));
	}

	/**
	 * Gets the type.
	 *
	 * @return the type
	 */
	private Type getType() {
		return new TypeToken<V>() {
		}.getType();
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#put(java.lang.Object, java.lang.Object)
	 */
	@Override
	public V put(K key, V value) {

		try {
			this.resultMap.put(key, my(Serializer.class).toJSON(value));
			return value;
		} catch (SerializationException e) {
			return null;
		}
	}

	/**
	 * Put.
	 *
	 * @param key
	 *            the key
	 * @param value
	 *            the value
	 * @return the v
	 */
	public V put(K key, String value) {

		return put(key, convertFromJson(value));
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#remove(java.lang.Object)
	 */
	@Override
	public V remove(Object key) {

		V value = get(key);
		this.resultMap.remove(key);
		return value;
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#putAll(java.util.Map)
	 */
	@Override
	public void putAll(Map<? extends K, ? extends V> m) {

		m.entrySet().forEach(es -> {
			put(es.getKey(), es.getValue());
		});
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#clear()
	 */
	@Override
	public void clear() {

		this.resultMap.clear();
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#keySet()
	 */
	@Override
	public Set<K> keySet() {

		return this.resultMap.keySet();
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#values()
	 */
	@Override
	public Collection<V> values() {

		Collection<V> v = new ArrayList<>();
		this.resultMap.values().forEach(i -> {
			v.add(convertFromJson(i));
		});

		return null;
	}

	/* (non-Javadoc)
	 * @see java.util.AbstractMap#entrySet()
	 */
	@Override
	public Set<java.util.Map.Entry<K, V>> entrySet() {

		HashMap<K, V> hm = new HashMap<>();
		this.resultMap.entrySet().forEach(es -> {
			hm.put(es.getKey(), convertFromJson(es.getValue()));
		});
		return hm.entrySet();
	}

	/**
	 * Convert from json.
	 *
	 * @param json
	 *            the json
	 * @return the v
	 */
	private V convertFromJson(String json) {
		try {

			return my(Serializer.class).fromJSON(json, getType());
		} catch (Exception e) {
			return null;
		}
	}

}
