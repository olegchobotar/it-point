import db from '../db';

const Categories = {
    /**
     * Get All Reflection
     * @param {object} req
     * @param {object} res
     * @returns {object} reflections array
     */
    async getAll(req, res) {
        const findAllQuery = 'SELECT DISTINCT name FROM article_categories';
        try {
            const { rows } = await db.query(findAllQuery);
            return res.status(200).send(rows);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
};

export default Categories;
