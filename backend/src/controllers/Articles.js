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
        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        const getUserQuery = 'SELECT * FROM users WHERE id = $1';
        const articlesText = `
            INSERT INTO articles(title, only_for_company, image_url, content, created_date, modified_date, author_id, company_id)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;
        `;

        try {
            const { rows: userRow} = await db.query(getUserQuery, [decoded.userId]);
            const values = [
                title,
                onlyForCompany,
                imageUrl,
                content,
                moment(new Date()),
                moment(new Date()),
                decoded.userId,
                userRow[0].company_id,
            ];

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
        const token = req.headers['x-access-token'] ;

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
          WHERE (
                    (
                        LOWER(a.title) LIKE LOWER($1)
                        OR $2 = ANY (c.categories)
                      ) 
                      AND 
                    ($4 IS NOT TRUE AND
                      (
                        a.only_for_company IS NOT TRUE OR (a.company_id = $3)
                        )
                      OR $4 IS TRUE AND (a.company_id = $3)
                      )
                  )
            `;
        try {
            let company_id = null;
            if (token) {
                const decoded = await jwt.verify(token, process.env.SECRET);
                const getUserQuery = 'SELECT * FROM users WHERE id = $1';
                const { rows: userRow} = await db.query(getUserQuery, [decoded.userId]);
                company_id = userRow[0] ? userRow[0].company_id : company_id;
            }
            const search = req.query.search || '';
            const onlyCompany = req.query.only_company === '1';

            const values = [
                `%${search}%`,
                search,
                company_id,
                onlyCompany,
            ];
            const { rows, rowCount } = await db.query(findAllQuery, values);
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
       a.author_id,
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
        const { title, onlyForCompany, imageUrl, content, categories } = req.body;
        const articleId = req.params.id;
        const findOneQuery = 'SELECT * FROM articles WHERE id = $1';
        const removeCategories = 'DELETE FROM article_categories WHERE article_id = $1';
        const updateOneQuery =`UPDATE articles
                               SET title = $1,
                                   only_for_company = $2,
                                   image_url = $3,
                                   content = $4,
                                   modified_date = $5
          WHERE id = $6 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [articleId]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'Article not found'});
            }
            const values = [
                title,
                onlyForCompany,
                imageUrl,
                content,
                moment(new Date()),
                articleId,
            ];
            const response = await db.query(updateOneQuery, values);

            await db.query(removeCategories, [articleId]);
            categories.forEach(async category => {
                const categoriesText = `INSERT INTO article_categories(article_id, name) VALUES ($1, $2)`;
                await db.query(categoriesText, [articleId, category]);
            });
            return res.status(200).send(response.rows[0]);
        } catch(err) {
            console.log(error);
            return res.status(400).send(err);
        }
    },
    async delete(req, res) {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        const decoded = await jwt.verify(token, process.env.SECRET);

        const deleteQuery = 'DELETE FROM articles WHERE id = $1 AND author_id = $2 returning *';
        try {
            const values = [
                req.params.id,
                decoded.userId,
            ];
            const { rows } = await db.query(deleteQuery, values);
            if(!rows[0]) {
                return res.status(404).send({'message': 'Article not found'});
            }
            return res.status(204).send({ 'message': 'Deleted' });
        } catch(error) {
            console.log(error);
            return res.status(400).send(error);
        }
    }
};

export default Articles;
