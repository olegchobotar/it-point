import moment from 'moment';
import jwt from 'jsonwebtoken';
import db from '../db';

const Companies = {
    async getOne(req, res) {
        if (!req.params.id) {
            return res.status(400).send({'message': 'Id is missing'});
        }
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).send({ 'message': 'You don`t have access' });
        }

        const query = `            
            SELECT c.id, c.name, c.description, c.created_date, c.owner_id, c.categories, u.users
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
            const company = {
              ...rows[0],
              categories: rows[0].categories ? rows[0].categories.map(category => ({ id: category, name: category })) : [],
            };
            return res.status(200).send({ company });
        } catch(error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({ 'message': 'Company with that name already exist' })
            }
            console.log(error);
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
            await db.query(updateUserQuery, [rows[0].id, decoded.userId]);

            return res.status(201).send(rows[0]);
        } catch(error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({ 'message': 'Company with that name already exist' })
            }
            console.log(error);
            return res.status(400).send(error);
        }
    },
    async update(req, res) {
        const { name, description, categories } = req.body;
        if (!req.params.id) {
            return res.status(400).send({'message': 'Id is missing'});
        }
        if (!name) {
            return res.status(400).send({'message': 'Name is missing'});
        }
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        const decoded = await jwt.verify(token, process.env.SECRET);

        const query = `UPDATE companies 
          set name = $1,
              description = $2,
              categories = $3,
              modified_date = $4
          WHERE id = $5 AND owner_id = $6 RETURNING *`;

        const values = [
            name,
            description,
            categories,
            moment(new Date()),
            req.params.id,
            decoded.userId,
        ];
        try {
            const { rows } = await db.query(query, values);
            if (!rows[0]) {
                return res.status(403).send({'message': 'You don`t have permission'});
            }
            return res.status(200).send({ success: true });
        } catch(error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({ 'message': 'Company with that name already exist' })
            }
            console.log(error);
            return res.status(400).send(error);
        }
    },
    async delete(req, res) {
        const token = req.headers['x-access-token'];
        const decoded = await jwt.verify(token, process.env.SECRET);

        if (!token) {
            return res.status(403).send({ 'message': 'You don`t have access' });
        }
        if (!req.params.id) {
            return res.status(400).send({'message': 'Id is missing'});
        }
        const deleteQuery = 'DELETE FROM companies WHERE id = $1 AND owner_id = $2 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id, decoded.userId]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'Company not found or you don`t have permission'});
            }
            return res.status(204).send({ 'message': 'Deleted' });
        } catch(error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }
};

export default Companies;
