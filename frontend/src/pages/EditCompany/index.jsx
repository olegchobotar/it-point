import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Button from '../../components/Button';
import setCompany from '../../actions/company/setCompany';
import CategoriesInput from '../../components/CategoriesInput';
import UsersList from '../../components/UsersList';
import './style.css';

import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {withRouter} from "react-router";

const EditCompany = props => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [company, setCompany] = useState({});

    const { companyId } = props;

    useEffect( () => {
        const fetchApi = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/v1/companies/${companyId}`, {
                headers: {
                    'x-access-token': localStorage.token,
                }
            });
            setName(data.name);
            setDescription(data.description || '');
            setCompany(data);
        };
        fetchApi();
    }, []);

    const handleDelete = currentIndex => {
        setCategories(categories.filter((tag, index) => index !== currentIndex))
    };

    const handleAddition = category => {
        setCategories(([...categories, category]));
    };

    const handleDrag = (category, currentPosition, newPosition) => {
        const newCategories = categories.slice();
        newCategories.splice(currentPosition, 1);
        newCategories.splice(newPosition, 0, category);

        setCategories(newCategories);
    };

    return (
        <div className="edit-company-wrapper">
           <div>
               <h2>{company.name}</h2>
           </div>
            <div className="edit-company-content">
                <TextField
                    className="edit-company-input"
                    label="Company name"
                    color="primary"
                    value={name}
                    onChange={(event) => {setName(event.target.value)}}
                />
                <TextField
                    className="edit-company-input"
                    label="Small description"
                    color="primary"
                    value={description}
                    onChange={(event) => {setDescription(event.target.value)}}
                />
                <p>Add main categories</p>
                <CategoriesInput
                    placeholder="Category"
                    categories={categories}
                    handleDelete={handleDelete}
                    handleDrag={handleDrag}
                    handleAddition={handleAddition}
                />
                <UsersList />
                <Button width="400px">
                    Save
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    companyId: state.Company.company.id,
});

export default compose(
    connect(
        mapStateToProps,
        { setCompany }
    ),
    withRouter,
)(EditCompany);
