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

-- CREATE TABLE IF NOT EXISTS categories_to_articles
-- (
--   article_id INT REFERENCES articles ON DELETE CASCADE,
--   category_id INT REFERENCES categories ON DELETE CASCADE,
--   PRIMARY KEY (article_id, category_id)
-- )
