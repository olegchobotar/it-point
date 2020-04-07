import db from '../db';

const Categories = {
    async getAll(req, res) {
        const findAllQuery = 'SELECT DISTINCT name AS id, name FROM article_categories';
        try {
            const { rows } = await db.query(findAllQuery);
            return res.status(200).send(rows);
        } catch(error) {
            console.log(error);
            return res.status(400).send(error);
        }
    },
};

export default Categories;
