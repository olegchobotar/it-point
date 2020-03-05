import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { TextField } from '@material-ui/core';
import Button from '../../components/Button';
import setCompany from '../../actions/company/setCompany';
import CategoriesInput from '../../components/CategoriesInput';
import './style.css';

import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {withRouter} from "react-router";

const EditCompany = props => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);

    const { company } = props;

    console.log(categories);

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
                    defaultValue={company.name}
                    onChange={(event) => {setName(event.target.value)}}
                />
                <TextField
                    className="edit-company-input"
                    label="Small description"
                    color="primary"
                    defaultValue={company.description}
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
                <Button width="400px">
                    Save
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    company: state.Company.company,
});

export default compose(
    connect(
        mapStateToProps,
        { setCompany }
    ),
    withRouter,
)(EditCompany);
