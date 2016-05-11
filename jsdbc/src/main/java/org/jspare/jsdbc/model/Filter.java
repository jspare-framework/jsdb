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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * Instantiates a new filter.
 */

/**
 * Instantiates a new filter.
 */
@Data
@Accessors(fluent=true)
public class Filter {

	/** The where. */
	private Map<String, String> where;
	
	/** The conditions. */
	private List<Condition> conditions;

	/** The select. */
	private String select;
	
	/** The sort by. */
	private String sortBy;

	/** The by key. */
	private String byKey;
	
	/**
	 * Gets the where.
	 *
	 * @return the where
	 */
	public Map<String, String> getWhere() {
		
		if (where == null) {
			
			where = new HashMap<String, String>();
		}
		return where;
	}
	
	/**
	 * Gets the conditions.
	 *
	 * @return the conditions
	 */
	public List<Condition> getConditions() {
		
		if (conditions == null) {
			
			conditions = new ArrayList<>();
		}
		return conditions;
	}
}