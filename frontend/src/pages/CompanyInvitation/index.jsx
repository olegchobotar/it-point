import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { withRouter } from 'react-router';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { addBubble, Bubble } from '../../basic/helpers/bubbles';
import setCompany from '../../actions/company/setCompany';
import { connect } from 'react-redux';
import { compose } from 'redux';

import axios from 'axios';

const CompanyInvitation = props => {
    const query = useQuery();
    const [companyName, setCompanyName] = useState('');

    const token = query.get('token');

    useEffect(() => {
        if (!Object.entries(props.currentUser).length) {
            addBubble('Please log in', Bubble.Error);
            props.history.push('/');
        } else if (props.company) {
            addBubble('You are already a member of another company', Bubble.Error);
            props.history.push('/');
        }

        axios.get(`http://localhost:5000/api/v1/invitations/${token}`)
            .then(({ data }) => {
                setCompanyName(data.name);
            })
            .catch(({ response: { data: { message } } }) => {
                addBubble(message, Bubble.Error);
                props.history.push('/');
            });
    }, []);

    const joinCompany = () => {
        axios.post(`http://localhost:5000/api/v1/invitations`, { token }, {
            headers: {
                'x-access-token': localStorage.token,
            }
        })
            .then(({ data }) => {
                addBubble(`Welcome new ${data.name} member`);
                props.setCompany(data);
                props.history.push('/');
            })
            .catch(({ response: { data: { message } } }) => {
                addBubble(message, Bubble.Error);
            });
    };

    return (
        <Modal title="Invitation" open={true} height="200px" width="600px">
            <p>{`Do you really want to join the ${companyName}? You can leave at any moment`}</p>
            <Button onClick={joinCompany}>Join the company</Button>
        </Modal>
    );
};

const mapStateToProps = state => ({
    currentUser: state.User.currentUser,
    company: state.Company.company,
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        { setCompany },
    ),
)(CompanyInvitation);

const useQuery = () => new URLSearchParams(useLocation().search);
