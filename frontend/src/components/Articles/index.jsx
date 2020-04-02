import React from 'react';
import Article from './Article';
import './style.css';

const Articles = props => {
    const { articles } = props;
    const art = [...articles, ...articles, ...articles];
    return (
        <div className='articles-wrapper'>
            {articles.map(article => (
                <Article key={article.id} {...article} />
            ))}
        </div>
    );
};

export default Articles;
