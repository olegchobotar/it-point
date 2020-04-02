import jwt from 'jsonwebtoken';
import db from '../db';

const Auth = {
    async verifyToken(req, res) {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        try {
            const decoded = await jwt.verify(token, process.env.SECRET);
            const text = 'SELECT * FROM users WHERE id = $1';
            const { rows } = await db.query(text, [decoded.userId]);
            if (!rows[0]) {
                return res.status(400).send({ 'message': 'The token you provided is invalid' });
            }

            return res.status(200).send({userId: decoded.userId});
        } catch(error) {
            return res.status(400).send(error);
        }
    }
};

export default Auth;
