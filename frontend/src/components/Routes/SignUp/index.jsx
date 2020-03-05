import React, { useState } from 'react';
import './styles.css';
import Modal from '../../Modal';
import { TextField, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
import loginUser from '../../../actions/user/loginUser';
import Button from '../../../components/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';

const SignUp = props => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (event, type) => {
        let handler = null;
        switch (type) {
            case 'nickname':
                handler = setNickname;
                break;
            case 'password':
                handler = setPassword;
                break;
            default:
                handler = setEmail;
        }
        handler(event.target.value);
    };

    const handleRegisterBtnClick = async () => {
        const res = await axios.post('http://localhost:5000/api/v1/users',
            {email, nickname, password});
        props.loginUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        props.history.push('/');
    };

    return (
        <Modal title="Sign up" height="450px">
            <div>
                <div>
                    <TextField
                        className="sign-up-form-input"
                        label="Email"
                        color="primary"
                        onChange={(event) => handleInputChange(event, 'email')}
                    />
                    <TextField
                        className="sign-up-form-input"
                        label="Nickname"
                        color="primary"
                        onChange={(event) => handleInputChange(event, 'nickname')}
                    />
                    <TextField
                        className="sign-up-form-input"
                        label="Password"
                        color="primary"
                        type="password"
                        onChange={(event) => handleInputChange(event, 'password')}
                    />
                    <Button
                        color="primary"
                        fullWidth
                        onClick={handleRegisterBtnClick}
                    >
                        SIGN UP
                    </Button>
                    <span className="sign-up-form-sign-with">Or Sign up with:</span>
                </div>
                <div className="sign-up-form-social-wrapper">
                    <StyledIconButton className="sign-up-form-social">
                        <FacebookIcon />
                    </StyledIconButton>
                    <StyledIconButton className="sign-up-form-social">
                        <TwitterIcon />
                    </StyledIconButton>
                </div>
                <hr/>
                <span className="sign-up-form-sign-up">
                    Already registered?
                    <Link to={'/sign-in'}> Sign in </Link>
                </span>
            </div>
        </Modal>
    );
};

export default compose(
    connect(
        null,
        { loginUser }
    ),
    withRouter,
)(SignUp);

const StyledIconButton = styled(IconButton) ({
    borderRadius: 50,
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
    width: '70px',
});
