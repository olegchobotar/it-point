import React, { useState } from 'react';
import Modal from '../../Modal';
import { TextField, Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import setCompany from '../../../actions/company/setCompany';
import './style.css';

import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {withRouter} from "react-router";

const CreateCompany = props => {
    console.log(props);

    const [name, setName] = useState('');
    const handleCompanyCreationClick = async () => {
        const res = await axios.post('http://localhost:5000/api/v1/companies',
            { name }, {
                headers: {
                    'x-access-token': localStorage.token,
                }
            });
        props.setCompany(res.data);
        props.history.push('/');

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
                    <StyledButton
                        color="primary"
                        fullWidth
                        onClick={handleCompanyCreationClick}
                    >
                        Register
                    </StyledButton>
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
const StyledButton = styled(Button) ({
    background: 'linear-gradient(40deg, #45cafc, #303f9f)',
    borderRadius: 50,
    boxShadow: '0 4px 5px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)',
    color: 'white',
    height: 48,
    marginTop: '30px',
    padding: '0 30px',
});
