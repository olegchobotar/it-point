import express from 'express';
import 'babel-polyfill';
import bodyParser from 'body-parser';
const cors = require('cors');
const { pool } = require('./config');
import Users from './src/controllers/Users';
import Auth from './src/middlewares/Auth';

// const db = require('./queries')

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/v1/users', Users.create);
app.post('/api/v1/users/login',Users.login);
app.delete('/api/v1/users/me', Auth.verifyToken, Users.delete);

// Start server
app.listen(process.env.PORT || 5000, () => {
    console.log(`app is running on port ${process.env.PORT || 5000}`)
});
