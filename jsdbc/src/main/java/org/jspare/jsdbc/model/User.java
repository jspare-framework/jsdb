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
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * The Class User.
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
@Accessors(fluent=true)

/**
 * Instantiates a new user.
 */

/**
 * Instantiates a new user.
 */
@NoArgsConstructor

/**
 * Instantiates a new user.
 *
 * @param name
 *            the name
 * @param key
 *            the key
 * @param mail
 *            the mail
 * @param expirationDate
 *            the expiration date
 * @param roles
 *            the roles
 * @param timestamp
 *            the timestamp
 */

/**
 * Instantiates a new user.
 *
 * @param name
 *            the name
 * @param key
 *            the key
 * @param mail
 *            the mail
 * @param expirationDate
 *            the expiration date
 * @param roles
 *            the roles
 * @param timestamp
 *            the timestamp
 */
@AllArgsConstructor
public class User {
	
	/** The name. */
	private String name;
	
	/** The key. */
	private String key;
	
	/** The mail. */
	private String mail;
	
	/** The expiration date. */
	private LocalDateTime expirationDate;
	
	/** The roles. */
	private List<String> roles = new ArrayList<>();
	
	/** The timestamp. */
	private LocalDateTime timestamp;
}
