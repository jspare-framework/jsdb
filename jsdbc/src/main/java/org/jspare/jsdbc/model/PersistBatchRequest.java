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

import org.jspare.jsdbc.stereotype.EntityUtils;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * The Class PersistBatchRequest.
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

/* (non-Javadoc)
 * @see java.lang.Object#hashCode()
 */

/* (non-Javadoc)
 * @see java.lang.Object#hashCode()
 */
@EqualsAndHashCode(callSuper = false)
public class PersistBatchRequest {

	/**
	 * Instantiates a new persist batch request.
	 *
	 * @param entities
	 *            the entities
	 */
	public PersistBatchRequest(Map<String, Object> entities) {
		this.entities = entities;
		entities.entrySet().forEach(es -> EntityUtils.performCleanDataWithEntityStereotype(es.getValue()));
	}

	/** The entities. */
	private final Map<String, Object> entities;
}
