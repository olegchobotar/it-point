import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { withRouter } from 'react-router';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import setCompany from '../../actions/company/setCompany';
import { connect } from 'react-redux';
import { compose } from 'redux';

import axios from 'axios';

const CompanyInvitation = props => {
    const query = useQuery();
    const [companyName, setCompanyName] = useState('');

    const token = query.get('token');

    useEffect(() => {
        const fetchApi = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/v1/invitations/${token}`);
            setCompanyName(data.name);
        };
        fetchApi();
    });

    const joinCompany = async () => {
        const { data } = await axios.post(`http://localhost:5000/api/v1/invitations`, { token }, {
            headers: {
                'x-access-token': localStorage.token,
            }
        });
        if (data) {
            props.setCompany(data);
            props.history.push('/');
        }
    };

    return (
        <Modal title="Invitation" open={true} height="200px" width="600px">
            <p>{`Do you really want to join the ${companyName}? You can leave at any moment`}</p>
            <Button onClick={joinCompany}>Join the company</Button>
        </Modal>
    );
};

export default compose(
    withRouter,
    connect(
        null,
        { setCompany },
    ),
)(CompanyInvitation);

const useQuery = () => new URLSearchParams(useLocation().search);
