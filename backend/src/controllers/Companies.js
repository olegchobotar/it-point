import moment from 'moment';
import { getUserData } from '../helpers/user';
import jwt from 'jsonwebtoken';
import db from '../db';

const Companies = {
    async getOne(req, res) {
        if (!req.params.id) {
            return res.status(400).send({'message': 'Id is missing'});
        }
        const token = req.headers['x-access-token'];
        if(!token) {
            return res.status(403).send({ 'message': 'Forbidden' });
        }
        const decoded = await jwt.verify(token, process.env.SECRET);

        // const createQuery = `SELECT c.id, c.name, c.description, c.created_date, c.owner_id, u.users FROM companies AS c,
        //   LATERAL (
        //     SELECT ARRAY(
        //                SELECT *
        //                FROM users AS u
        //                WHERE u.company_id = c.id
        //              ) AS users
        //     ) u WHERE c.id = $1`;
        const query = `            
            SELECT c.id, c.name, c.description, c.created_date, c.owner_id, u.users
             FROM companies AS c,
                  LATERAL (
                    SELECT ARRAY(
                               SELECT id
                               FROM users
                               WHERE company_id = c.id
                             ) AS users
                    ) u
             WHERE c.id = $1`;

        try {
            const { rows } = await db.query(query, [req.params.id]);

            // const { rowsUsers } = await db.query(getCompanyUsersQuery, [req.params.id]);
            // console.log('isss', rowsUsers, req.params.id)
            // const users = rowsUsers.map(user => getUserData(user));

            return res.status(200).send({...rows[0]});
        } catch(error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({ 'message': 'Company with that name already exist' })
            }
            return res.status(400).send(error);
        }

    },
    async create(req, res) {
        if (!req.body.name) {
            return res.status(400).send({'message': 'Name is missing'});
        }
        const token = req.headers['x-access-token'];
        if(!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        const decoded = await jwt.verify(token, process.env.SECRET);

        const createQuery = `INSERT INTO
      companies(name, owner_id, created_date, modified_date)
      VALUES($1, $2, $3, $4)
      returning *`;
        const values = [
            req.body.name,
            decoded.userId,
            moment(new Date()),
            moment(new Date())
        ];

        const updateUserQuery = `UPDATE users set company_id = $1 WHERE id = $2`;

        try {
            const { rows } = await db.query(createQuery, values);
            console.log(rows);
            await db.query(updateUserQuery, [rows[0].id, decoded.userId]);

            return res.status(201).send(rows[0]);
        } catch(error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({ 'message': 'Company with that name already exist' })
            }
            return res.status(400).send(error);
        }
    },
    /**
     * Delete A User
     * @param {object} req
     * @param {object} res
     * @returns {void} return status code 204
     */
    async delete(req, res) {
        const deleteQuery = 'DELETE FROM companies WHERE id=$1 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.company.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'company not found'});
            }
            return res.status(204).send({ 'message': 'deleted' });
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default Companies;
