const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create Tables
 */
const createUsersTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY,
            nickname VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            company_id UUID,
            created_date TIMESTAMP,
            modified_date TIMESTAMP
           );
  `;
    makeQuery(query);
};

const createCompaniesTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS companies (
          id UUID PRIMARY KEY,
          name VARCHAR(50) UNIQUE NOT NULL,
          description VARCHAR(255),
          created_date TIMESTAMP,
          owner_id UUID NOT NULL,
          modified_date TIMESTAMP,
          FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
     );
    alter table users add foreign key (company_id) references companies(id);
  `;
    makeQuery(query);
};

const createArticlesTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS articles (
         id UUID PRIMARY KEY,
         title VARCHAR(50) NOT NULL,
         description VARCHAR(255) NOT NULL,
         publisher_id INT NOT NULL,
         created_date TIMESTAMP,
         modified_date TIMESTAMP,
         author_id UUID NOT NULL,
         FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
   );
  `;
    makeQuery(query);
};

const createCategoriesTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS categories (
          id UUID PRIMARY KEY,
          name VARCHAR(50) NOT NULL
    );
  `;
    makeQuery(query);
};

/**
 * Drop Tables
 */

const dropUsersTable = () => {
    const query = 'DROP TABLE IF EXISTS users CASCADE';
    makeQuery(query);
};

const dropCompaniesTable = () => {
    const query = 'DROP TABLE IF EXISTS companies CASCADE';
    makeQuery(query);
};

const dropArticlesTable = () => {
    const query = 'DROP TABLE IF EXISTS articles CASCADE ';
    makeQuery(query);
};

const dropCategoriesTable = () => {
    const query = 'DROP TABLE IF EXISTS categories';
    makeQuery(query);
};

const makeQuery = query =>
    pool.query(query)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

const createAllTables = () => {
    createUsersTable();
    createCompaniesTable();
    createCategoriesTable();
    createArticlesTable();
};

const dropAllTables = () => {
    dropCompaniesTable();
    dropUsersTable();
    dropArticlesTable();
    dropCategoriesTable();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createUsersTable,
    createCompaniesTable,
    createArticlesTable,
    dropUsersTable,
    dropCompaniesTable,
    dropArticlesTable,
    createAllTables,
    dropAllTables,
};

require('make-runnable');
