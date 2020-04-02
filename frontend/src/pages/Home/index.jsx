import React, { useEffect, useState } from 'react';
import Articles from '../../components/Articles';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import './style.css';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Home = props =>  {
    const [articles, setArticles] = useState([]);
    const [companyRestrict, setCompanyRestrict] = useState(false);

    const fetchAPI = async () => {
        const { data } = await axios.get('http://localhost:5000/api/v1/articles');
        setArticles(data.articles);
    };

    const handleSearch = async (event) => {
        const value = event.target.value;
        const { data } = await axios.get(`http://localhost:5000/api/v1/articles?search=${value}`);
        setArticles(data.articles);
    };

    useEffect( () => {
        fetchAPI();
    },[]);
    return (
        <div>
            <div className="home-filter-wrapper">
                <FormControlLabel
                    className="home-company-switch"
                    control={
                        <Switch
                            checked={companyRestrict}
                            onChange={event => setCompanyRestrict(event.target.checked)}
                            color="primary"
                        />
                    }
                    label="Company"
                    labelPlacement="start"
                />
                <TextField
                    id="outlined-search"
                    size="small"
                    className="home-filter-search"
                    label="Search..."
                    type="search"
                    variant="outlined"
                    onChange={handleSearch}
                />
            </div>
            <Articles articles={articles}/>
        </div>
    )
};

export default Home;
