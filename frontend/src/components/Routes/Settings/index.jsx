import React, { useState } from 'react';
import Modal from '../../Modal';

import { loginUser } from '../../../actions/user/loginUser';
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
import Collapse from "@material-ui/core/Collapse";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

import { makeStyles } from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    text: {
        display: 'flex',
        marginLeft: theme.spacing(4),

    }
}));

const Settings = props => {
    const { company, canEditCompany } = props;
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const [changeNicknameOpen, setChangeNicknameOpen] = useState(false);
    const [nickname, setNickname] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const classes = useStyles();

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
                // props.history.push('/');
                // props.logoutUser();
            })
            .catch(({ response: { data: { message } } }) => {
                addBubble(message, Bubble.Error);
            });
    };

    const handleUpdateUsername = () => {
        axios.put(`http://localhost:5000/api/v1/users/me`, { nickname }, {
            headers: {
                'x-access-token': localStorage.token,
            }
        })
            .then(({ data }) => {
                addBubble(`Your welcome, ${data.user.nickname}`);
                props.loginUser(data.user);
            })
            .catch(({ response: { data: { message } } }) => {
                addBubble(message, Bubble.Error);
            });
    };

    const handleUpdatePassword = () => {
        axios.put(`http://localhost:5000/api/v1/users/me`, { oldPassword, newPassword }, {
            headers: {
                'x-access-token': localStorage.token,
            }
        })
            .then(() => {
                addBubble('Successfully updated');
                setOldPassword('');
                setNewPassword('');
            })
            .catch(({ response: { data: { message } } }) => {
                setOldPassword('');
                setNewPassword('');
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
                    selected={changeNicknameOpen}
                    button
                    onClick={
                        () => {
                            setChangePasswordOpen(false);
                            setChangeNicknameOpen(!changeNicknameOpen);
                        }
                    }
                >
                    <ListItemText primary="Change Username" />
                    {changeNicknameOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={changeNicknameOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding >
                        <TextField
                            className={classes.text}
                            label="New nickname"
                            color="primary"
                            onChange={(event) => {setNickname(event.target.value)}}
                        />
                        <ListItem
                            button
                            disabled={!nickname}
                            className={classes.nested}
                            onClick={handleUpdateUsername}
                        >
                            <ListItemText primary="Update" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem
                    selected={changePasswordOpen}
                    button
                    onClick={
                        () => {
                            setChangeNicknameOpen(false);
                            setChangePasswordOpen(!changePasswordOpen);
                        }}
                >
                    <ListItemText primary="Change Password" />
                    {changePasswordOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={changePasswordOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding >
                        <TextField
                            className={classes.text}
                            type="password"
                            label="Old password"
                            color="primary"
                            value={oldPassword}
                            onChange={(event) => {setOldPassword(event.target.value)}}
                        />
                        <TextField
                            className={classes.text}
                            type="password"
                            label="New password"
                            color="primary"
                            value={newPassword}
                            onChange={(event) => {setNewPassword(event.target.value)}}
                        />
                        <ListItem
                            button
                            disabled={!oldPassword || !newPassword}
                            className={classes.nested}
                            onClick={handleUpdatePassword}
                        >
                            <ListItemText primary="Update" />
                        </ListItem>
                    </List>
                </Collapse>
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
