const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// const pool = new Pool({
//     user: envValue.DB_USER,
//     host: envValue.DB_HOST,
//     database: envValue.DB_DATABASE,
//     password: envValue.DB_PASSWORD,
//     port: envValue.PORT,
// });

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY,
            nickname VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_date TIMESTAMP,
            modified_date TIMESTAMP
         );

        CREATE TABLE IF NOT EXISTS companies (
           id UUID PRIMARY KEY,
           name VARCHAR(50) NOT NULL,
           description VARCHAR(255) NOT NULL,
           created_date TIMESTAMP,
           modified_date TIMESTAMP  
        );
    
        CREATE TABLE IF NOT EXISTS articles (
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
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Drop Tables
 */
const dropTables = () => {
    const queryText = 'DROP TABLE IF EXISTS users CASCADE; DROP TABLE IF EXISTS companies; DROP TABLE IF EXISTS articles;';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createTables,
    dropTables
};

require('make-runnable');
