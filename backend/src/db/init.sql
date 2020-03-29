CREATE TABLE IF NOT EXISTS users
(
  id            SERIAL PRIMARY KEY,
  nickname      VARCHAR(50) UNIQUE NOT NULL,
  email         VARCHAR(50) UNIQUE NOT NULL,
  password      VARCHAR(100)       NOT NULL,
  company_id    INT,
  created_date  TIMESTAMP,
  modified_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies
(
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(50) UNIQUE NOT NULL,
  description   VARCHAR(255),
  created_date  TIMESTAMP,
  owner_id      INT               NOT NULL,
  modified_date TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS articles
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  only_for_company BOOLEAN,
  image_url VARCHAR(100),
  content VARCHAR(1500) NOT NULL,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  author_id INT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS article_categories
(
  id   SERIAL PRIMARY KEY,
  article_id INT,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS invitations
(
  id   SERIAL PRIMARY KEY,
  company_id INT NOT NULL UNIQUE,
  token VARCHAR(80) NOT NULL,
  expired_at TIMESTAMP NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE
);
