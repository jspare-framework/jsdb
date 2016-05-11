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

import static org.jspare.core.container.Environment.my;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Optional;
import java.util.UUID;

import org.apache.commons.lang.StringUtils;
import org.jspare.jsdbc.data.Cleaner;
import org.jspare.jsdbc.data.CleanerHolder;
import org.jspare.jsdbc.data.FieldCleaner;
import org.jspare.jsdbc.exception.JsdbcException;

import lombok.extern.slf4j.Slf4j;

/** The Constant log. */

/** The Constant log. */
@Slf4j
public class EntityUtils {

	/**
	 * Checks if is entity data.
	 *
	 * @param data
	 *            the data
	 * @return true, if is entity data
	 */
	public static boolean isEntityData(Object data) {

		if (data instanceof Class<?>) {
			return ((Class<?>) data).isAnnotationPresent(Entity.class);
		}

		return data.getClass().isAnnotationPresent(Entity.class);
	}

	/**
	 * Find key by entity.
	 *
	 * @param entity
	 *            the entity
	 * @param data
	 *            the data
	 * @return the string
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	public static String findKeyByEntity(Entity entity, Object data) throws JsdbcException {
		try {

			if (entity.autoGenerateKey()) {

				return UUID.randomUUID().toString();
			}

			String findKeyByColumn = entity.key();
			for (Field field : data.getClass().getDeclaredFields()) {

				if (field.isAnnotationPresent(Key.class)
						|| (!StringUtils.isEmpty(findKeyByColumn) && field.getName().equals(findKeyByColumn))) {

					field.setAccessible(true);

					String value = field.get(data).toString();
					if (field.isAnnotationPresent(Cleaner.class)) {

						Class<?> fieldCleanerClazz = field.getAnnotation(Cleaner.class).value();
						Optional<FieldCleaner<?>> fieldCleaner = retrieveFieldCleanerInstance(fieldCleanerClazz);
						if (fieldCleaner.isPresent()) {

							value = (String) fieldCleaner.get().clean(field.get(data));
						}
					}

					return value;
				}
			}
			for (Method method : data.getClass().getDeclaredMethods()) {

				if (method.isAnnotationPresent(Key.class)) {

					method.setAccessible(true);

					return method.invoke(data).toString();
				}
			}
		} catch (Exception e) {

			throw new JsdbcException(e.getMessage(), e);
		}
		throw new JsdbcException(String.format("Not found Key for entity class %s", data.getClass().getName()));
	}

	/**
	 * Perform clean data with entity stereotype.
	 *
	 * @param data
	 *            the data
	 */
	public static void performCleanDataWithEntityStereotype(Object data) {

		for (Field field : data.getClass().getDeclaredFields()) {

			try {

				field.setAccessible(true);
				Object value = field.get(data);

				if (value != null && field.isAnnotationPresent(Cleaner.class)) {

					Class<?> fieldCleanerClazz = field.getAnnotation(Cleaner.class).value();

					Optional<FieldCleaner<?>> fieldCleaner = retrieveFieldCleanerInstance(fieldCleanerClazz);
					if (!fieldCleaner.isPresent()) {

						continue;
					}
					setField(fieldCleaner.get(), field, data);

				}
			} catch (Exception e) {

				log.error("Error on clean field [{}] with cleaner [{}] the field will be ignored", field.getName(),
						field.getAnnotation(Cleaner.class).value().getName());
			}
		}
	}

	/**
	 * Retrieve field cleaner instance.
	 *
	 * @param fieldCleanerClazz
	 *            the field cleaner clazz
	 * @return the optional
	 * @throws Exception
	 *             the exception
	 */
	private static Optional<FieldCleaner<?>> retrieveFieldCleanerInstance(Class<?> fieldCleanerClazz) throws Exception {

		Optional<FieldCleaner<?>> fieldCleaner = my(CleanerHolder.class).getCleaner(fieldCleanerClazz);

		if (!fieldCleaner.isPresent()) {

			FieldCleaner<?> fieldCleanerInstance = (FieldCleaner<?>) fieldCleanerClazz.newInstance();
			my(CleanerHolder.class).registryCleaner(fieldCleanerInstance);
			fieldCleaner = Optional.of(fieldCleanerInstance);
		}
		return fieldCleaner;
	}

	/**
	 * Sets the field.
	 *
	 * @param fieldCleaner
	 *            the field cleaner
	 * @param field
	 *            the field
	 * @param data
	 *            the data
	 * @throws Exception
	 *             the exception
	 */
	private static void setField(FieldCleaner<?> fieldCleaner, Field field, Object data) throws Exception {

		field.set(data, fieldCleaner.clean(field.get(data)));
	}
}