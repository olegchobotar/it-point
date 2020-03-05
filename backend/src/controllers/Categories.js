import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import categories from '../helpers/categories';

const Categories = {
    /**
     * Get All Reflection
     * @param {object} req
     * @param {object} res
     * @returns {object} reflections array
     */
    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM categories';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send(categories);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
};

export default Categories;
