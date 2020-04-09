import moment from 'moment';
import db from '../db';
import { isValidEmail, generateToken, getUserData } from '../helpers/user';
import { hashValue, compareHashedValue } from '../helpers/hash';
import jwt from "jsonwebtoken";

const Users = {
    async create(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const hashedPassword = hashValue(req.body.password);
        const createQuery = `INSERT INTO
      users(nickname, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
        const values = [
            req.body.nickname,
            req.body.email,
            hashedPassword,
            moment(new Date()),
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(createQuery, values);
            const user = rows[0];
            const token = generateToken(user.id);
            return res.status(201).send({ token, user: getUserData(user) });
        } catch(error) {
            if (error.routine === '_bt_check_unique') {
                console.log(error);
                return res.status(400).send({ 'message': 'User with that email or nickname already exist' })
            }
            console.log(error);
            return res.status(400).send(error);
        }
    },
    async login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const text = 'SELECT * FROM users WHERE email = $1';
        try {
            const { rows } = await db.query(text, [req.body.email]);
            console.log(rows);
            const user = rows[0];
            if (!user) {
                return res.status(400).send({'message': 'The credentials you provided is incorrect'});
            }
            if(!compareHashedValue(user.password, req.body.password)) {
                return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
            }

            const getRelatedCompanyQuery = 'SELECT * FROM companies WHERE id = $1';
            const { rows: company } = await db.query(getRelatedCompanyQuery, [user.company_id]);

            const token = generateToken(user.id);
            return res.status(200).send({ token, user: getUserData(user), company: company[0] });
        } catch(error) {
            console.log(error);
            return res.status(400).send(error)
        }
    },
    async getCompanyUsers(req, res) {
        const query = 'SELECT * FROM users WHERE company_id = $1';
        try {
            const { rows: users } = await db.query(query, [req.params.id]);
            return res.status(200).send({ users });
        } catch(error) {
            console.log(error);
            return res.status(400).send(error)
        }
    },
    async delete(req, res) {
        console.log(req.user, res)
        const deleteQuery = 'DELETE FROM users WHERE id = $1 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.user.id]);
            console.log(rows);
            if (!rows[0]) {
                return res.status(404).send({'message': 'User not found'});
            }
            return res.status(204).send({ 'success': true });
        } catch(error) {
            console.log(error);
            return res.status(400).send(error);
        }
    },
    async update(req, res) {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        try {
            const decoded = await jwt.verify(token, process.env.SECRET);
            const text = 'SELECT * FROM users WHERE id = $1';
            const { rows } = await db.query(text, [decoded.userId]);
            const foundedUser = rows[0];
            let hashedPassword = null;
            if (!foundedUser) {
                return res.status(400).send({ 'message': 'The token you provided is invalid' });
            }
            if (req.body.oldPassword) {
                if(!compareHashedValue(foundedUser.password, req.body.oldPassword)) {
                    return res.status(400).send({ 'message': 'The password you provided is incorrect' });
                }
                hashedPassword = hashValue(req.body.newPassword);
            }

            const query = 'UPDATE users SET nickname = $1, password = $2 WHERE id = $3 returning *';
            const values = [
                req.body.nickname || foundedUser.nickname,
                hashedPassword || foundedUser.password,
                decoded.userId,
            ];
            const { rows: updatedValue } = await db.query(query, values);
            const user = updatedValue[0];

            return res.status(200).send({user: getUserData(user)});
        } catch(error) {
            if (error.routine === '_bt_check_unique') {
                console.log(error);
                return res.status(400).send({ 'message': 'User with that email or nickname already exist' });
            }
            console.log(error);
            return res.status(400).send(error);
        }
    }
};

export default Users;
