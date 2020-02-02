import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import {
    hashPassword,
    comparePassword,
    isValidEmail,
    generateToken,
    getUserData,
} from '../helpers/user';

const Users = {
    /**
     * Create A User
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
    async create(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!isValidEmail(req.body.email)) {
            return res.status(200).send({ 'message': 'Please enter a valid email address' });
        }
        const hashPassword = hashPassword(req.body.password);
        console.log(hashPassword)
        const createQuery = `INSERT INTO
      users(id, nickname, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
        const values = [
            uuidv4(),
            req.body.nickname,
            req.body.email,
            hashPassword,
            moment(new Date()),
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(createQuery, values);
            const token = generateToken(rows[0].id);
            return res.status(201).send({ token });
        } catch(error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
            }
            console.log(error)
            return res.status(400).send(error);
        }
    },
    /**
     * Login
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */
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
            const user = rows[0];
            console.log(rows)
            if (!rows[0]) {
                return res.status(400).send({'message': 'The credentials you provided is incorrect'});
            }
            if(!comparePassword(user.password, req.body.password)) {
                return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
            }
            const token = generateToken(user.id);
            return res.status(200).send({ token, user: getUserData(user) });
        } catch(error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Delete A User
     * @param {object} req
     * @param {object} res
     * @returns {void} return status code 204
     */
    async delete(req, res) {
        const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.user.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'user not found'});
            }
            return res.status(204).send({ 'message': 'deleted' });
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default Users;
