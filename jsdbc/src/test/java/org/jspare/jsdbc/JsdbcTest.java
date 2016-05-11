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

import static org.junit.Assert.fail;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.jspare.core.container.Environment;
import org.jspare.core.container.Inject;
import org.jspare.core.container.MySupport;
import org.jspare.jsdbc.entity.Car;
import org.jspare.jsdbc.exception.CommandFailException;
import org.jspare.jsdbc.exception.JsdbcException;
import org.jspare.jsdbc.model.Condition;
import org.jspare.jsdbc.model.ConditionType;
import org.jspare.jsdbc.model.CountResult;
import org.jspare.jsdbc.model.DataSource;
import org.jspare.jsdbc.model.Domain;
import org.jspare.jsdbc.model.Instance;
import org.jspare.jsdbc.model.ListDomainsResult;
import org.jspare.jsdbc.model.ListInstancesResult;
import org.jspare.jsdbc.model.Query;
import org.jspare.jsdbc.model.QueryResult;
import org.jspare.jsdbc.model.Result;
import org.jspare.jsdbc.model.Status;
import org.jspare.jsdbc.model.StatusResult;
import org.jspare.jsdbc.model.User;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import io.github.lukehutch.fastclasspathscanner.utils.Log;

/**
 * The Class JsdbcTest.
 *
 * @author pflima
 * @since 04/05/2016
 */
public class JsdbcTest extends MySupport {

	/** The jsdbc. */
	@Inject
	private Jsdbc jsdbc;

	/**
	 * Pre setup.
	 */
	@BeforeClass
	public static void preSetup() {

		Environment.registryComponent(JsdbcMockedImpl.class);
	}

	/**
	 * Setup.
	 */
	@Before
	public void setup() {

		jsdbc.dataSource(new DataSource("teste", "http://127.0.0.1", 5732));
	}

	/**
	 * Test status.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testStatus() throws CommandFailException, JsdbcException {

		StatusResult result = jsdbc.status();

		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}

	/**
	 * Test add user.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testAddUser() throws CommandFailException, JsdbcException {

		User user = new User().name("dev.user").key("dev.user");
		user.roles().add("status");
		user.roles().add("grantMngInstance");
		user.roles().add("grantMngSecurity");
		user.roles().add("grantMngDomain");

		Result result = jsdbc.createUser(user);

		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}

	/**
	 * Test get user.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testGetUser() throws CommandFailException, JsdbcException {

		User user = new User().name("Test User").key("test.user").mail("test.user@jspare.org");
		jsdbc.createUser(user);

		User result = jsdbc.getUser("test.user");
		Log.log(ReflectionToStringBuilder.toString(result));
		Assert.assertNotNull(result);
	}

	/**
	 * Test list user.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testListUser() throws CommandFailException, JsdbcException {

		List<User> users = jsdbc.listUsers();

		Log.log(ReflectionToStringBuilder.toString(users));

		Assert.assertNotNull(users);
	}

	/**
	 * Test remove user.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testRemoveUser() throws CommandFailException, JsdbcException {

		Result result = jsdbc.removeUser("test.user");

		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}

	/**
	 * Test create instance.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testCreateInstance() throws CommandFailException, JsdbcException {

		Result result = jsdbc.createInstance(Instance.of("test-instance"));

		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}

	/**
	 * Test remove instance.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testRemoveInstance() throws CommandFailException, JsdbcException {

		jsdbc.createInstance(Instance.of("test-instance"));
		
		Result result = jsdbc.removeInstance(Instance.of("test-instance"));

		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}

	/**
	 * Test remove wrong instance.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test(expected = CommandFailException.class)
	public void testRemoveWrongInstance() throws CommandFailException, JsdbcException {

		jsdbc.removeInstance(Instance.of("test-wrong-instance"));
		fail();
	}

	/**
	 * Test list instances.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testListInstances() throws CommandFailException, JsdbcException {

		ListInstancesResult instances = jsdbc.listInstances();

		Assert.assertNotNull(instances);
	}

	/**
	 * Test create domain.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testCreateDomain() throws CommandFailException, JsdbcException {

		Result result = jsdbc.createDomain(Domain.of("jiraApiConfigs"));

		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}

	/**
	 * Test remove domain.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testRemoveDomain() throws CommandFailException, JsdbcException {

		jsdbc.createDomain(Domain.of("cars"));

		Result result = jsdbc.removeDomain(Domain.of("cars"));

		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}

	/**
	 * Test list domains.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testListDomains() throws CommandFailException, JsdbcException {

		jsdbc.createDomain(Domain.of("cars"));

		ListDomainsResult listDomains = jsdbc.listDomains();

		Assert.assertTrue(listDomains.getResult().getDomains().size() > 0);
	}

	/**
	 * Test persist.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testPersist() throws CommandFailException, JsdbcException {

		jsdbc.createDomain(Domain.of("cars"));

		Car car = new Car("bbb4869", "Punto", 2011, new BigDecimal(25000));

		Result result = jsdbc.persist(car);

		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}

	/**
	 * Test persist batch.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testPersistBatch() throws CommandFailException, JsdbcException {

		jsdbc.createDomain(Domain.of("cars"));

		List<Car> cars = new ArrayList<>();
		cars.add(new Car("aaa123", "500", 2014, new BigDecimal(75000)));
		cars.add(new Car("bbb222", "BMW X5", 2016, new BigDecimal(85000)));

		Result result = jsdbc.persist(Domain.of("cars"), cars);

		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}

	/**
	 * Test remove.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testRemove() throws CommandFailException, JsdbcException {

		jsdbc.createDomain(Domain.of("cars"));

		Car car = new Car("bbb4869", "Punto", 2011, new BigDecimal(25000));

		jsdbc.persist(car);

		Result result = jsdbc.remove(car);

		Assert.assertEquals(Status.SUCCESS, result.getStatus());
	}

	/**
	 * Test count.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testCount() throws CommandFailException, JsdbcException {

		Query query = new Query().forDomain(Domain.of("cars"), Car.class);

		CountResult result = jsdbc.count(query);
		Assert.assertNotNull(result);
		Assert.assertEquals(Integer.valueOf(1), result.getCount());
	}

	/**
	 * Test query for.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testQueryFor() throws CommandFailException, JsdbcException {

		Query query = new Query().forDomain(Domain.of("car"), Car.class);

		QueryResult<Car> result = jsdbc.queryFor(query);
		Assert.assertNotNull(result);
	}

	/**
	 * Test query for with sort by.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testQueryForWithSortBy() throws CommandFailException, JsdbcException {

		Query query = new Query().forDomain(Domain.of("cars"), Car.class);

		QueryResult<Car> result = jsdbc.queryFor(query);
		Assert.assertNotNull(result);
	}

	/**
	 * Test query for with condition.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testQueryForWithCondition() throws CommandFailException, JsdbcException {

		Query query = new Query().forDomain(Domain.of("cars"), Car.class)
				.where(Condition.of("name", ConditionType.CONTAINS, "X5"));

		QueryResult<Car> result = jsdbc.queryFor(query);
		Assert.assertNotNull(result);
	}

	/**
	 * Test query for where.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testQueryForWhere() throws CommandFailException, JsdbcException {

		Query query = new Query().forDomain(Domain.of("cars"), Car.class).where("name", "Cruze");

		QueryResult<Car> result = jsdbc.queryFor(query);
		Assert.assertNotNull(result);
	}

	/**
	 * Test query for key.
	 *
	 * @throws CommandFailException
	 *             the command fail exception
	 * @throws JsdbcException
	 *             the jsdbc exception
	 */
	@Test
	public void testQueryForKey() throws CommandFailException, JsdbcException {

		Query query = new Query().forDomain(Domain.of("cars"), Car.class).byKey("Cruze");

		QueryResult<Car> result = jsdbc.queryFor(query);

		Assert.assertNotNull(result);
	}
}
