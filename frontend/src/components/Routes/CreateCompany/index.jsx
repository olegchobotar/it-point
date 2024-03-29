import React, { useState } from 'react';
import Modal from '../../Modal';
import { TextField } from '@material-ui/core';
import Button from './../../../components/Button';
import setCompany from '../../../actions/company/setCompany';
import './style.css';

import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {withRouter} from "react-router";
import {addBubble, Bubble} from "../../../basic/helpers/bubbles";

const CreateCompany = props => {
    console.log(props);

    const [name, setName] = useState('');
    const handleCompanyCreationClick = () => {
        axios.post('http://localhost:5000/api/v1/companies',
            { name }, {
                headers: {
                    'x-access-token': localStorage.token,
                }
            })
            .then(({ data }) => {
                props.setCompany(data);
                props.history.push('/');
            })
            .catch(({ response: { data: { message } } }) => {
                addBubble(message, Bubble.Error);
            });


    };
    return (
        <Modal title="Register a company" height="200px">
            <div>
                <div>
                    <TextField
                        className="sign-in-form-input"
                        label="Company name"
                        color="primary"
                        onChange={(event) => {setName(event.target.value)}}
                    />
                    <Button
                        color="primary"
                        fullWidth
                        onClick={handleCompanyCreationClick}
                    >
                        Register
                    </Button>
                </div>

            </div>
        </Modal>
    );
};

const mapStateToProps = state => ({
    userId: state.User,
});

export default compose(
    connect(
        mapStateToProps,
        { setCompany }
    ),
    withRouter,
)(CreateCompany);
