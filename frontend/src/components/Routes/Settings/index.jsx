import React, { useState } from 'react';
import Modal from '../../Modal';

import loginUser from '../../../actions/user/loginUser';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { hasPermissionToEditCompany } from '../../../basic/helpers/user';
import './style.css';

const Settings = props => {
    const { company, canEditCompany } = props;

    const handleCompanyClick = () => {
        if (company) {
            props.history.push(`/edit-company`);
        } else {
            props.history.push('/create-company');
        }
    };

    const deleteAccount = () => {

    };

    return (
        <Modal title="Settings">
            <List component="div" role="list">
                <ListItem
                    button
                    disabled={!canEditCompany}
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

const mapStateToProps = state => ({
    company: state.Company.company,
    canEditCompany: hasPermissionToEditCompany(state),
});

export default compose(
    connect(
        mapStateToProps,
        { loginUser }
    ),
    withRouter,
)(Settings);
