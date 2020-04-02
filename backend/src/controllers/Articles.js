import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import articles from '../helpers/articles';
import jwt from "jsonwebtoken";

const Articles = {
    async create(req, res) {
        const { title, onlyForCompany, imageUrl, content, categories } = req.body;

        if (!title || !content || !categories.length) {
            return res.status(400).send({ 'message': 'Some values are missing' });
        }
        const token = req.headers['x-access-token'];
        if(!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        const articlesText = `
            INSERT INTO articles(title, only_for_company, image_url, content, created_date, modified_date, author_id)
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id;
        `;

        const values = [
            title,
            onlyForCompany,
            imageUrl,
            content,
            moment(new Date()),
            moment(new Date()),
            decoded.userId,
        ];

        try {
            const { rows: articleRow } = await db.query(articlesText, values);
            const articleId = articleRow[0].id;
            categories.forEach(async category => {
                const categoriesText = `INSERT INTO article_categories(article_id, name) VALUES ($1, $2)`;
                await db.query(categoriesText, [articleId, category]);
            });
            return res.status(201).send({articleRow, categories});
        } catch(error) {
            console.log(error)
            return res.status(400).send(error);
        }
    },
    async getAll(req, res) {
        const findAllQuery = `
            SELECT a.id, a.title, a.only_for_company, a.image_url, a.content, a.created_date, u.nickname AS author, c.categories 
            FROM articles AS a
            INNER JOIN users AS u
            ON a.author_id = u.id, LATERAL (
              SELECT ARRAY(
                     SELECT name
                     FROM article_categories AS c
                     WHERE c.article_id = a.id
                   ) AS categories
              ) c
          WHERE LOWER(a.title) LIKE LOWER($1)
             OR $2 = ANY (c.categories)
            `;
        try {
            const search = req.query.search || '';
            const { rows, rowCount } = await db.query(findAllQuery, [`%${search}%`, search]);
            return res.status(200).send({ se: req.params.search, articles: rows,  });
        } catch(error) {
            console.log(error)
            return res.status(400).send(error);
        }
    },
    async getOne(req, res) {
        const text = `SELECT 
       a.id, 
       a.title, 
       a.only_for_company,
       a.image_url,
       a.content,
       a.created_date,
       a.modified_date,
       u.nickname as author,
       c.categories
       FROM articles as a 
        INNER JOIN users AS u
         ON a.author_id = u.id, LATERAL (
           SELECT ARRAY(
             SELECT name
             FROM article_categories AS c
             WHERE c.article_id = a.id
             ) AS categories
           ) c 
        WHERE a.id = $1`;

        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'Not found'});
            }
            console.log(rows[0])
            return res.status(200).send(rows[0]);
        } catch(error) {
            console.log(error)
            return res.status(400).send(error)
        }
    },
    async update(req, res) {
        const findOneQuery = 'SELECT * FROM reflections WHERE id=$1';
        const updateOneQuery =`UPDATE reflections
      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
      WHERE id=$5 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'reflection not found'});
            }
            const values = [
                req.body.success || rows[0].success,
                req.body.low_point || rows[0].low_point,
                req.body.take_away || rows[0].take_away,
                moment(new Date()),
                req.params.id
            ];
            const response = await db.query(updateOneQuery, values);
            return res.status(200).send(response.rows[0]);
        } catch(err) {
            console.log(error);
            return res.status(400).send(err);
        }
    },
    async delete(req, res) {
        const deleteQuery = 'DELETE FROM reflections WHERE id=$1 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'reflection not found'});
            }
            return res.status(204).send({ 'message': 'deleted' });
        } catch(error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }
};

export default Articles;
