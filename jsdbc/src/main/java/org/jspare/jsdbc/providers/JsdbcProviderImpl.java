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
package org.jspare.jsdbc.providers;

import org.apache.commons.lang.StringUtils;
import org.jspare.core.container.Environment;
import org.jspare.jsdbc.Jsdbc;
import org.jspare.jsdbc.JsdbcFactory;
import org.jspare.jsdbc.model.Credential;
import org.jspare.jsdbc.model.DataSource;

/**
 * The Class JSpareProviderImpl.
 *
 * @author pflima
 * @since 04/05/2016
 */
public class JsdbcProviderImpl implements JsdbcProvider{
	
	/** The Constant HOST_SUFIX_KEY. */
	private static final String HOST_SUFIX_KEY = "jsdbc%shost";
	
	/** The Constant PORT_SUFIX_KEY. */
	private static final String PORT_SUFIX_KEY = "jsdbc%sport";
	
	/** The Constant INSTANCE_SUFIX_KEY. */
	private static final String INSTANCE_SUFIX_KEY = "jsdbc%sinstance";
	
	/** The Constant CREDENTIAL_SUFIX_KEY. */
	private static final String CREDENTIAL_SUFIX_KEY = "jsdbc%scredential";
	
	/** The data source. */
	private DataSource dataSource;
	
	/** The credential. */
	private Credential credential;

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.providers.Provider#provide()
	 */
	@Override
	public Jsdbc provide() {

		return JsdbcFactory.newInstance().credential(credential).dataSource(dataSource);
	}

	/* (non-Javadoc)
	 * @see org.jspare.jsdbc.providers.JSpareProvider#fromConfig(java.lang.String)
	 */
	@Override
	public Provider fromConfig(String key) {
		
		key = StringUtils.isEmpty(key) ? "." : ".".concat(key).concat(".");
		dataSource = DataSource.of(Environment.CONFIG.get(String.format(INSTANCE_SUFIX_KEY, key), "public"), 
				Environment.CONFIG.get(String.format(HOST_SUFIX_KEY, key), "http://127.0.0.1"), 
				Integer.parseInt(Environment.CONFIG.get(String.format(PORT_SUFIX_KEY, key), "5732"))
		);
		credential = Credential.of(Environment.CONFIG.get(String.format(CREDENTIAL_SUFIX_KEY, key), StringUtils.EMPTY));
		return this;
	}

}
