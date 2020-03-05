import moment from 'moment';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import db from '../db';

const Companies = {
    /**
     * Create A User
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
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
      VALUES($1, $2, $3, $4, $5)
      returning *`;
        const values = [
            req.body.name,
            decoded.userId,
            moment(new Date()),
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(createQuery, values);
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
