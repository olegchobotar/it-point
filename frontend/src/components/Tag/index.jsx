import React from 'react';

import './styles.css';

const Tag = props => {
    const { tag } = props;
    return (
        <span className="article-tag">
            <strong>{tag.toUpperCase()}</strong>
        </span>
    );
};



export default Tag;
