import React from 'react';
import defaultImage from '../../assets/no-image.png';

import Tag from '../../components/Tag';
import { withRouter } from 'react-router';

import './style.css';

const Article = props => {
    const {
        id,
        title,
        categories,
        author,
        image_url: imageUrl,
        created_date: createdDate,
    } = props;

    const handleRedirection = () => {
        props.history.push(`/articles/${id}`);
    };

    const formattedDate = new Date(createdDate)
    return (
        <div className="tile-article-wrapper" onClick={handleRedirection}>
            <img src={imageUrl || defaultImage} />
            <div className="tile-article-content">
                <div>
                    {categories.map(tag => (
                        <Tag key={tag} tag={tag} />
                    ))}
                </div>
                <h3 className="tile-article-title">{title}</h3>
                <div className="tile-article-footer">
                    by <strong>{author} </strong>&#8226; {formattedDate.toDateString()}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Article);
