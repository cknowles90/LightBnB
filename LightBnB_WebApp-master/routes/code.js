const getAllProperties = (options, limit = 10) => {
  const queryParams = [];

  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    JOIN property_reviews ON property_reviews.property_id = properties.id
    `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id && !options.city) {
    queryParams.push(options.owner_id);
    queryString += `WHERE owner_id = $${queryParams.length}`;
  } else if (options.owner_id && options.city) {
    queryParams.push(options.owner_id);
    queryString += `AND owner_id = $${queryParams.length}`;
  }

  if (
    options.minimum_price_per_night &&
    options.maximum_price_per_night &&
    !options.city &&
    !options.owner_id
  ) {
    queryParams.push(options.minimum_price_per_night);
    queryString += `WHERE (cost_per_night/100) > $${queryParams.length}`;
    queryParams.push(options.maximum_price_per_night);
    queryString += `AND (cost_per_night/100) < $${queryParams.length}`;
  } else if (
    options.minimum_price_per_night &&
    options.maximum_price_per_night &&
    (options.city || options.owner_id)
  ) {
    queryParams.push(options.minimum_price_per_night);
    queryString += `AND (cost_per_night/100) > $${queryParams.length}`;
    queryParams.push(options.maximum_price_per_night);
    queryString += `AND (cost_per_night/100) < $${queryParams.length}`;
  }

  if (options.minumum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING AVG(property_reviews.rating) < $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};