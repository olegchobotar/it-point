CREATE TABLE IF NOT EXISTS users
(
  id            UUID PRIMARY KEY,
  nickname      VARCHAR(50) UNIQUE NOT NULL,
  email         VARCHAR(50) UNIQUE NOT NULL,
  password      VARCHAR(100)       NOT NULL,
  company_id    UUID,
  created_date  TIMESTAMP,
  modified_date TIMESTAMP
);
CREATE TABLE IF NOT EXISTS companies
(
  id            UUID PRIMARY KEY,
  name          VARCHAR(50) UNIQUE NOT NULL,
  description   VARCHAR(255),
  created_date  TIMESTAMP,
  owner_id      UUID               NOT NULL,
  modified_date TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS articles
(
  id            UUID PRIMARY KEY,
  title         VARCHAR(50)  NOT NULL,
  description   VARCHAR(255) NOT NULL,
  publisher_id  INT          NOT NULL,
  created_date  TIMESTAMP,
  modified_date TIMESTAMP,
  author_id     UUID         NOT NULL,
  FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories
(
  id   UUID PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);
