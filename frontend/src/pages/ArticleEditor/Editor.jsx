import React, { useEffect, useState } from 'react';
import Editor from '../ArticleEditor';
import axios from 'axios';

export default props => {
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/articles/${props.match.params.id}`)
            .then(({ data }) => {
                setArticle({
                    ...data,
                    categories: data.categories.map(category => ({ name: category })),
                    imageUrl: data.image_url,
                });
            });
    }, []);

    return article ? (<Editor article={article} edit={true} />) : null;
};
