/*
  # Add example photos

  1. Insert Data
    - Add two example photos to the photos table
    - Photos are optimized for 4:5 aspect ratio display
*/

INSERT INTO photos (url, created_at)
VALUES 
  (
    'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg',
    CURRENT_TIMESTAMP
  ),
  (
    'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg',
    CURRENT_TIMESTAMP
  );