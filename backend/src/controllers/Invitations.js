import moment from 'moment';
import db from '../db';
import { hashValue, compareHashedValue } from '../helpers/hash';
import send from '../helpers/sendInvitation'
import jwt from 'jsonwebtoken';
import { isValidEmail } from '../helpers/user';

const Invitations = {
    async generateInvitation(req, res) {
        if (!req.params.id) {
            return res.status(400).send({'message': 'Company id is missing'});
        }
        const hashedValue = hashValue(req.params.id).replace(/[^\w\s]/gi, '');
        console.log(hashValue(req.params.id), hashedValue);
        const createQuery = `INSERT INTO
           invitations(company_id, token, expired_at)
           VALUES($1, $2, $3)
           ON CONFLICT (company_id) DO UPDATE 
              SET expired_at = $3 RETURNING token`;

        const expiredAt = Date.now() + 7 * 24 * 3600 * 1000;
        const values = [
            req.params.id,
            hashedValue,
            moment(expiredAt),
        ];

        try {
            const { rows } = await db.query(createQuery, values);
            return res.status(201).send({ token: rows[0].token, expiredAt });
        } catch(error) {
            console.log(error);
            return res.status(400).send(error);
        }
    },
    async sendInvitation(req, res) {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }

        if (!req.body.invitationLink || !req.body.email) {
            return res.status(400).send({'message': 'Email is missing'});
        }
        if (!isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const decoded = await jwt.verify(token, process.env.SECRET);

        const query = `SELECT c.name AS company, u.nickname AS owner
        FROM companies AS c
        INNER JOIN users AS u
        ON c.owner_id = u.id
        WHERE u.id = $1`;

        const values = [
           decoded.userId
        ];

        try {
            const { rows } = await db.query(query, values);
            const value = rows[0];
            if (!value) {
                return res.status(403).send({'message': 'Forbidden'});
            }
            const result = await send({
                ...req.body,
                ...value,
            });

            if (result.error) {
                return res.status(500).send({'message': 'Problem with smtp'});
            }

            return res.status(200).send({ success: true });
        } catch(error) {
            console.log(error)
            return res.status(400).send(error);
        }

    },
    async getInvitationInfo(req, res) {
        if (!req.params.token) {
            return res.status(400).send({ 'message': 'Invitation token is not provided' });
        }
        const query = `SELECT c.name 
            FROM companies AS c
            INNER JOIN invitations as i
            on i.company_id = c.id
            WHERE i.token = $1 AND i.expired_at > $2`;

        const values = [
            req.params.token,
            moment(Date.now()),
        ];

        try {
            const { rows } = await db.query(query, values);
            const value = rows[0];
            console.log(value);
            if (!value) {
                return res.status(400).send({'message': 'Token is wrong or expired', value: rows});
            }
            return res.status(200).send(value);
        } catch(error) {
            console.log(error);
            return res.status(400).send(error);
        }

    },
    async AcceptInvitation(req, res) {
        if (!req.body.token) {
            return res.status(400).send({ 'message': 'Invitation token is not provided' });
        }

        const userToken = req.headers['x-access-token'];
        if (!userToken) {
            return res.status(400).send({ 'message': 'User token is not provided' });
        }
        const decoded = await jwt.verify(userToken, process.env.SECRET);

        const query = `UPDATE users AS u
          set company_id = i.company_id
          FROM invitations AS i, companies as c
          WHERE u.id = $1 AND i.token = $2 AND i.expired_at > $3 AND c.id = i.company_id
          RETURNING c.*`;

        const values = [
            decoded.userId,
            req.body.token,
            moment(Date.now()),
        ];

        try {
            const { rows } = await db.query(query, values);
            const value = rows[0];

            if (!value) {
                return res.status(400).send({'message': 'Token is wrong or expired'});
            }
            return res.status(200).send(value);
        } catch(error) {
            console.log(error);
            return res.status(400).send(error);
        }

    }
};

export default Invitations;
