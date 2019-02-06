DROP DATABASE IF EXISTS userlist;
CREATE DATABASE userlist;

\c userlist;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL
);

INSERT INTO users(username) VALUES ('Reed'), ('Corey'), ('Jasmine');
