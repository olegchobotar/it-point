import React, { useEffect, useState } from 'react';
import Editor from '../ArticleEditor';
import axios from 'axios';

export default props => {
    const [article, setArticle] = useState(null);
    const articleId = props.match.params.id;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/articles/${articleId}`)
            .then(({ data }) => {
                setArticle({
                    ...data,
                    categories: data.categories.map(category => ({ name: category })),
                    imageUrl: data.image_url,
                });
            });
    }, []);

    return article ? <Editor
        article={article}
        edit={true}
        update={true}
        articleId={articleId}
    /> : null;
};
