import React, { useState } from 'react';
import Modal from '../../Modal';
import { TextField, Button, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import loginUser from '../../../actions/user/loginUser';
import './style.css';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const Settings = props => {
    const { company } = props;

    const handleCompanyClick = () => {
        if (company) {
            props.history.push(`/companies/${company.id}/edit`);
        } else {
            props.history.push('/companies/create');
        }

    };

    const deleteAccount = () => {

    };

    return (
        <Modal title="Settings">
            <List component="div" role="list">
                <ListItem
                    button
                    divider
                    role="listitem"
                    onClick={handleCompanyClick}
                >
                    <ListItemText primary={company ? `Edit company ${company.name}` : 'Create company'} />
                </ListItem>
                <ListItem
                    button
                    divider
                    role="listitem"
                    onClick={deleteAccount}
                >
                    <ListItemText primary="Delete account" />
                </ListItem>
            </List>
        </Modal>
    );
};

const mapDispatchToProps = state => ({
   company: state.Company.company,
});

export default compose(
    connect(
        mapDispatchToProps,
        { loginUser }
    ),
    withRouter,
)(Settings);
const StyledButton = styled(Button) ({
    background: 'linear-gradient(40deg, #45cafc, #303f9f)',
    borderRadius: 50,
    boxShadow: '0 4px 5px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)',
    color: 'white',
    height: 48,
    marginTop: '30px',
    padding: '0 30px',
});

const StyledIconButton = styled(IconButton) ({
    borderRadius: 50,
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
    width: '70px',
});
