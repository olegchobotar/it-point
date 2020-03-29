import React, { useState, useEffect } from 'react';
import {IconButton, TextField, Input} from '@material-ui/core';
import Button from '../../components/Button';
import setCompany from '../../actions/company/setCompany';
import CategoriesInput from '../../components/CategoriesInput';
import UsersList from '../../components/UsersList';
import SendIcon from '@material-ui/icons/Send';
import CopyIcon from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';
import './style.css';

import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {withRouter} from "react-router";
import InputAdornment from "@material-ui/core/InputAdornment";

const EditCompany = props => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [categories, setCategories] = useState([]);
    const [invitationLink, setInvitationLink] = useState('');
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

    const generateInvitationLink = async () => {
        if (!invitationLink) {
            const { data } = await axios.post(`http://localhost:5000/api/v1/companies/${companyId}/invitations`, { companyId });
            setInvitationLink(`http://localhost:3000/company/verify?token=${data.hashedValue}`);
        }
    };

    const addToClipboard = event => {
        event.stopPropagation();
        copy(invitationLink);
    };
    
    const sendInvitation = async () => {
        if (!invitationLink) {
            await generateInvitationLink();
        } 
        const { data } = await axios.post(`http://localhost:5000/api/v1/invitations/send`, { email, invitationLink }, {
            headers: {
                'x-access-token': localStorage.token,
            }
        });
        console.log(data);
    };
    
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
                <UsersList companyId={companyId}/>
                <div>
                    <div className="user-list-link-wrapper">
                        <Input
                            className="user-list-invitation-input"
                            color="primary"
                            placeholder="Click to generate invitation link"
                            disabled={true}
                            value={invitationLink}
                            onClick={generateInvitationLink}
                            endAdornment={
                                invitationLink &&
                                <InputAdornment position="end">
                                    <IconButton onClick={addToClipboard}>
                                        <CopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                    <TextField
                        className="user-list-invitation-input"
                        label="Enter email to send invitation"
                        color="primary"
                        onChange={(event) => {setEmail(event.target.value)}}
                    />
                    <IconButton onClick={sendInvitation}>
                        <SendIcon className="user-list-add-icon"/>
                    </IconButton>
                </div>
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
