/*
 * Copyright 2015 TechFull IT Services.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package org.jspare.jsdbc.samples.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.jspare.jsdbc.stereotype.Entity;
import org.jspare.jsdbc.stereotype.Key;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(fluent = true)
@Entity(domain = "person")
public class Person {

	@Key
	private String personId;
	private String name;
	private float height;
	private LocalDate birthday;
	private Gender gender;
	private LocalDateTime creation;
	private List<History> histories;
	private Map<String, Person> friends;
	private double points;
	private transient boolean sessionExpired;
}