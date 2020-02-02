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
            created_date TIMESTAMP,
            modified_date TIMESTAMP
         );
  `;
    makeQuery(query);
};

const createCompaniesTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS companies (
          id UUID PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          description VARCHAR(255) NOT NULL,
          created_date TIMESTAMP,
          modified_date TIMESTAMP
    );
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

/**
 * Drop Tables
 */

const dropUsersTable = () => {
    const query = 'DROP TABLE IF EXISTS users CASCADE';
    makeQuery(query);
};

const dropCompaniesTable = () => {
    const query = 'DROP TABLE IF EXISTS companies';
    makeQuery(query);
};

const dropArticlesTable = () => {
    const query = 'DROP TABLE IF EXISTS articles';
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
    createArticlesTable();
};

const dropAllTables = () => {
    dropUsersTable();
    dropCompaniesTable();
    dropArticlesTable();
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
    dropAllTables
};

require('make-runnable');
