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
package org.jspare.jsdbc.data;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * The Class CleanerHolderImpl.
 *
 * @author pflima
 * @since 04/05/2016
 */
public class CleanerHolderImpl implements CleanerHolder {

	/** The cache cleaners. */
	private ConcurrentMap<Class<?>, FieldCleaner<?>> cacheCleaners = new ConcurrentHashMap<>();

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.data.CleanerHolder#registryCleaner(org.jspare.jsdbc.data.FieldCleaner)
	 */
	@Override
	public void registryCleaner(FieldCleaner<?> cleaner) {

		cacheCleaners.put(cleaner.getClass(), cleaner);
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.data.CleanerHolder#getCleaner(java.lang.Class)
	 */
	@Override
	public Optional<FieldCleaner<?>> getCleaner(Class<?> cleanerClazz) {

		if (!cacheCleaners.containsKey(cleanerClazz)) {

			return Optional.empty();
		}

		return Optional.of(cacheCleaners.get(cleanerClazz));
	}

}
