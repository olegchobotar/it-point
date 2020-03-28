import express from 'express';
import 'babel-polyfill';
import bodyParser from 'body-parser';
const cors = require('cors');
const { pool } = require('./config');
import Users from './src/controllers/Users';
import Articles from './src/controllers/Articles';
import Categories from './src/controllers/Categories';
import Companies from './src/controllers/Companies';
import Auth from './src/middlewares/Auth';
// const db = require('./queries')

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

app.get('/api/v1/categories', Categories.getAll);



const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'butterflywebdev@gmail.com',
        pass: 'xperiazl35'
    }
});

const mailOptions = {
    from: 'vindication@gmail.com',
    to: 'melissa.matvienko@gmail.com ',
    subject: 'It-Point Invitation',
    text: `Username has invited you to Company`
};

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });


// Start server
app.listen(process.env.PORT || 5000, () => {
    console.log(`app is running on port ${process.env.PORT || 5000}`)
});
