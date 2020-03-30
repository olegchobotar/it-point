import React, { useState } from 'react';
import Modal from '../../Modal';

import loginUser from '../../../actions/user/loginUser';
import { connect } from 'react-redux';
import axios from 'axios';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { hasPermissionToEditCompany } from '../../../basic/helpers/user';
import clearCompany from '../../../actions/company/clearCompany';
import { addBubble, Bubble } from '../../../basic/helpers/bubbles';
import './style.css';

const Settings = props => {
    const { company, canEditCompany } = props;

    const handleCreateCompany = () => {
        if (company) {
            props.history.push(`/edit-company`);
        } else {
            props.history.push('/create-company');
        }
    };

    const handleDeleteCompany = () => {
        axios.delete(`http://localhost:5000/api/v1/companies/${company.id}`, {
            headers: {
                'x-access-token': localStorage.token,
            }
        })
            .then(() => {
                addBubble('Deleted');
                props.clearCompany();
            })
            .catch(({ response: { data: { message } } }) => {
                addBubble(message, Bubble.Error);
            });
    };

    const handleDeleteAccount = () => {
        axios.delete(`http://localhost:5000/api/v1/users/me`, {
            headers: {
                'x-access-token': localStorage.token,
            }
        })
            .then(() => {
                addBubble('Deleted');
                props.clearCompany();
            })
            .catch(({ response: { data: { message } } }) => {
                addBubble(message, Bubble.Error);
            });
    };

    return (
        <Modal title="Settings">
            <List component="div" role="list">
                <ListItem
                    button
                    disabled={!canEditCompany}
                    divider
                    role="listitem"
                    onClick={handleCreateCompany}
                >
                    <ListItemText primary={company ? `Edit company ${company.name}` : 'Create company'} />
                </ListItem>
                <ListItem
                    button
                    disabled={!company || !canEditCompany}
                    divider
                    role="listitem"
                    onClick={handleDeleteCompany}
                >
                    <ListItemText primary={'Delete company'} />
                </ListItem>
                <ListItem
                    button
                    divider
                    role="listitem"
                    onClick={handleDeleteAccount}
                >
                    <ListItemText primary="Delete account" />
                </ListItem>
            </List>
        </Modal>
    );
};

const mapStateToProps = state => ({
    company: state.Company.company,
    canEditCompany: hasPermissionToEditCompany(state),
});

export default compose(
    connect(
        mapStateToProps,
        { loginUser, clearCompany }
    ),
    withRouter,
)(Settings);
