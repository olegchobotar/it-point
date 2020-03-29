import express from 'express';
import 'babel-polyfill';
import bodyParser from 'body-parser';
const cors = require('cors');
const { pool } = require('./config');
import Users from './src/controllers/Users';
import Articles from './src/controllers/Articles';
import Categories from './src/controllers/Categories';
import Companies from './src/controllers/Companies';
import Invitations from './src/controllers/Invitations';
import Auth from './src/middlewares/Auth';

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/v1/users', Users.create);
app.post('/api/v1/users/login',Users.login);
app.get('/api/v1/users/profile', Auth.verifyToken);
app.delete('/api/v1/users/me', Auth.verifyToken, Users.delete);

app.get('/api/v1/articles', Articles.getAll);
app.post('/api/v1/articles', Articles.create);
app.get('/api/v1/articles/:id', Articles.getOne);

app.post('/api/v1/companies', Companies.create);
app.get('/api/v1/companies/:id', Companies.getOne);
app.get('/api/v1/companies/:id/users', Users.getCompanyUsers);
app.post('/api/v1/companies/:id/invitations', Invitations.generateInvitation);

app.post('/api/v1/invitations/send', Invitations.sendInvitation);
app.get('/api/v1/invitations/:token', Invitations.getInvitationInfo);
app.post('/api/v1/invitations/', Invitations.AcceptInvitation);

app.get('/api/v1/categories', Categories.getAll);

// Start server
app.listen(process.env.PORT || 5000, () => {
    console.log(`app is running on port ${process.env.PORT || 5000}`)
});
