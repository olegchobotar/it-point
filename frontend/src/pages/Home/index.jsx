import React, { useEffect, useState } from 'react';
import Articles from '../../components/Articles';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import { connect } from 'react-redux';
import './style.css';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Home = props =>  {
    const [articles, setArticles] = useState([]);
    const [companyRestrict, setCompanyRestrict] = useState(false);
    const [search, setSearch] = useState('');

    const fetchAPI = async () => {
        const { data } = await axios.get('http://localhost:5000/api/v1/articles', {
            headers: {
                'x-access-token': localStorage.token || '',
            }
        });
        setArticles(data.articles);
    };

    const handleSearch = async ({ checked = null, value = null}) => {
        const { data } = await axios.get(`http://localhost:5000/api/v1/articles?search=${value === null ? search : value}&only_company=${checked !== null ? checked : companyRestrict ? 1 : 0}`, {
            headers: {
                'x-access-token': localStorage.token || '',
            }
        });
        setArticles(data.articles);
    };

    useEffect( () => {
        fetchAPI();
    },[props.user]);
    return (
        <div>
            <div className="home-filter-wrapper">
                <FormControlLabel
                    className="home-company-switch"
                    disabled={!props.company}
                    control={
                        <Switch
                            checked={companyRestrict}
                            onChange={event => {
                                const checked = event.target.checked;
                                setCompanyRestrict(checked);
                                handleSearch({ checked: checked ? 1 : 0 });
                            }}
                            color="primary"
                        />
                    }
                    label="Company articles"
                    labelPlacement="start"
                />
                <TextField
                    id="outlined-search"
                    size="small"
                    className="home-filter-search"
                    label="Search..."
                    type="search"
                    variant="outlined"
                    onChange={async event => {
                        const value = event.target.value;
                        await setSearch(value);
                        handleSearch({ value });
                    }}
                />
            </div>
            <Articles articles={articles}/>
        </div>
    )
};

const mapStateToProps = state => ({
    user: state.User,
    company: state.Company.company,
});
export default connect(mapStateToProps)(Home);
