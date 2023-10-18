INSERT INTO users (name, email, password)
VALUES 
  ('Trevor Johnson', 'bigtrev@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Claire McDowel', 'clairebear@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Spencer O''Riley', 'irishwisdom@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (1, 'Property 1 Title', 'Property 1 Description', 'https://www.bortolotto.com/BortolottoDev/media/Bortolotto/Projects/Bezier%20Curve%20House/Top-Image.png?ext=.png', 'https://www.nydesignagenda.com/wp-content/uploads/2022/06/New-York-Top-Luxury-Interior-Design-By-Anastasios-Interiors.-Cover-Image-700x390.jpg', 975, 4, 4.5, 7, 'Canada', 'Reallyexpensive Street', 'Vancouver', 'BC', 'V6J 1K3', true),
  (2, 'Property 2 Title', 'Property 2 Description', 'https://www.bortolotto.com/BortolottoDev/media/Bortolotto/Projects/Bezier%20Curve%20House/Top-Image.png?ext=.png', 'https://cdn.tatlerasia.com/tatlerasia/i/2022/02/14091613-landscapelanai-ish4910_cover_1500x1000.jpg', 425, 2, 2.5, 4, 'Canada', 'Misnamed Way', 'Toronto', 'ON', 'M5C 9E0', true),
  (3, 'Property 3 Title', 'Property 3 Description', 'https://architecture-org.s3.amazonaws.com/files/events/wide_lrg_thumbnail-flw-heurtley-house-steven-sabourin-01-no-2.jpg', 'https://robbreport.com/wp-content/uploads/2023/05/FLW_Tirranna2.jpg?w=1000', 350, 1, 2, 3, 'Canada', 'Affordable Avenue', 'Calgary', 'AB', 'T9W 7A4', true);

INSERT INTO property_reviews (guest_id, property_id, message, rating)
VALUES
  (1, 1, 'messageTextHere', 3.75),
  (2, 2, 'messageTextHere', 4.5),
  (3, 3, 'messageTextHere', 2.25);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES 
  ('2023-10-31', '2023-11-07', 1, 1),
  ('2023-10-23', '2023-10-28', 2, 2),
  ('2023-10-18', '2023-10-21', 3, 3);