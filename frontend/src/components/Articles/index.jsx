import React from 'react';
import './style.css';
import Article from './Article';

const Articles = props => {
    const { articles } = props;
    return (
        <div className='articles-wrapper'>
            {articles.map(article => (
                <Article key={article.id} {...article} />
            ))}
        </div>
    );
};

export default Articles;
