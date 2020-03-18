import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Articles from '../../components/Articles';

const Home = props =>  {
    const [articles, setArticles] = useState([]);

    const fetchAPI = async () => {
        const { data } = await axios.get('http://localhost:5000/api/v1/articles');
        console.log(data.articles)
        setArticles(data.articles);
    };

    useEffect( () => {
        fetchAPI();
    },[]);
    return (
        <div>
            <Articles articles={articles}/>
        </div>
    )
};

export default Home;
