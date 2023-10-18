CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE property_photos (
  id SERIAL PRIMARY KEY NOT NULL,
  thumbnail_photo_url VARCHAR(255),
  cover_photo_url VARCHAR(255)
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY NOT NULL, 
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  property_photos_id INTEGER REFERENCES property_photos(id) ON DELETE CASCADE,
  cost_per_night INTEGER,
  parking_spaces INTEGER,
  number_of_bathrooms INTEGER,
  number_of_bedrooms INTEGER,
  address_id INTEGER REFERENCES propertys_address(id) ON DELETE CASCADE,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE propertys_address (
  id SERIAL PRIMARY KEY NOT NULL,
  properties_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  house_appartment_number INTEGER,
  street VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  country VARCHAR(255),
  post_code VARCHAR(255)
);

CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
  message TEXT,
  rating SMALLINT
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY NOT NULL,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  address_id INTEGER REFERENCES propertys_address(id) ON DELETE CASCADE,
  start_date DATE,
  end_date DATE,
  reviews_id INTEGER REFERENCES property_reviews(id) ON DELETE CASCADE
);
