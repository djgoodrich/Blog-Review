CREATE DATABASE IF NOT EXISTS blog_reviews_db;
USE blog_reviews_db;

ALTER TABLE reviews 
DROP COLUMN createdAt;