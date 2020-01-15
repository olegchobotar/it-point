import React, { useState } from 'react';
import './styles.css';
import Modal from '../../Modal';
import { TextField, Button, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        const res = await axios.post('http://localhost:5000/users',
            {email, nickname, password});
        console.log(res);
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
                    <StyledButton
                        color="primary"
                        fullWidth
                        onClick={handleRegisterBtnClick}
                    >
                        SIGN UP
                    </StyledButton>
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

export default SignUp;

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
