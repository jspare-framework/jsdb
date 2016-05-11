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
package org.jspare.jsdbc.samples;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.jspare.core.container.Inject;
import org.jspare.core.container.MySupport;
import org.jspare.jsdbc.Jsdbc;
import org.jspare.jsdbc.exception.JsdbcException;
import org.jspare.jsdbc.model.Domain;
import org.jspare.jsdbc.model.Instance;
import org.jspare.jsdbc.providers.JsdbcProvider;
import org.jspare.jsdbc.samples.domain.Gender;
import org.jspare.jsdbc.samples.domain.Person;
import org.jspare.jsdbc.samples.utils.SimpleTimeBenchmark;

public class Sample extends MySupport {

	@Inject
	private JsdbcProvider provider;
	private Jsdbc jsdbc;
	private Random random;

	public Sample() {

		jsdbc = provider.fromConfig("sample").provide();
		random = new Random();
	}

	public static void main(String[] args) throws Exception {

		Sample sample = new Sample();
		// sample.prepareBase();
		// sample.testSingleInsert();
		// sample.testMultiInsert();

		SimpleTimeBenchmark test = new SimpleTimeBenchmark().start();
		sample.testBatchInsert();
		test.end();
	}

	private void prepareBase() throws JsdbcException {

		// Prepare database creating instance and domain
		// Note: These methods must be invoqued one time only, existing instance
		// or domain with same name one exception will be thrwoed.
		jsdbc.createInstance(Instance.of("public"));
		jsdbc.createDomain(Domain.of(Person.class));
	}

	private void testSingleInsert() throws JsdbcException {

		// Populate data with single command

		// 1- Populate entity
		Person person = generatePerson(1);

		SimpleTimeBenchmark test = new SimpleTimeBenchmark().start();
		jsdbc.persist(person);
		test.end().and().start();
	}

	private void testMultiInsert() throws JsdbcException {

		for (int i = 0; i < 100; i++) {

			jsdbc.persist(generatePerson(random.nextInt(900000)));
		}
	}

	private void testBatchInsert() throws JsdbcException, InterruptedException {

		// Populate data with single command
		List<Person> entities = new ArrayList<Person>();

		for (int x = 0; x < 10; x++) {
			for (int i = 0; i < 50000; i++) {

				entities.add(generatePerson(random.nextInt(90000000)));
			}
			jsdbc.persist(Domain.of(Person.class), entities);
		}
	}

	private Person generatePerson(int id) {

		Person person = new Person();
		person.personId(String.valueOf(id));
		person.name("Person id " + String.valueOf(id));
		person.birthday(LocalDate.of(random.nextInt(2016), Month.JANUARY, 1));
		person.creation(LocalDateTime.now());
		person.gender(Gender.MALE);
		person.points(random.nextInt(1000));
		person.sessionExpired(false);
		return person;
	}

}