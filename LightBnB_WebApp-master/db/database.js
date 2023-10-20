const { query } = require('express');
const { Pool } = require('pg');
const pool = new Pool ({
  user: 'vagrant',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

pool.connect();

// const properties = require("./json/properties.json");
// const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {

  const values = [email];
  const queryString = `SELECT * FROM users WHERE email = $1;`;

  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};



/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const values = [id];
  const queryString = `
  SELECT * FROM users WHERE id = $1;
  `;

  return pool
  .query(queryString, values)
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const values = [user.name, user.email, user.password];

  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)`;
  
  return pool
  .query(queryString, values)
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `
  SELECT reservations.*, properties.*
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  Where reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date 
  LIMIT $2;
  `;

  return pool
  .query(queryString, [guest_id, limit])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  const whereFilter = [];
  
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) AS average_ratings
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    whereFilter.push(`city ILIKE $${queryParams.length} `);
  }  
  
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    whereFilter.push(`owner_id = $${queryParams.length}`);
  } 
  
  console.log('options', options);
  if (options.minimum_price_per_night) {
    console.log('min');
    queryParams.push(options.minimum_price_per_night * 100);
    whereFilter.push(`(cost_per_night >= $${queryParams.length})`);
  }

  if(options.maximum_price_per_night) {
    console.log('max');
    queryParams.push(options.maximum_price_per_night * 100);
    whereFilter.push(`(cost_per_night <= $${queryParams.length})`);
  }
  
  if (whereFilter.length > 0) {
    queryString += 'WHERE ' + whereFilter.join(' AND ');
  }
  
  queryString += `
  GROUP BY properties.id `
  
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += ` HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}
  `;

  console.log(queryString, queryParams);

  return pool.query (queryString, queryParams)
  .then((result) => {
    // console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {

  
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
