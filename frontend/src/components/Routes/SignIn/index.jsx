import React from 'react';
import './styles.css';
import Modal from '../../Modal';
import { TextField, Button, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

const SignIn = props => {
    return (
        <Modal title="Sign in">
            <div>
                <div>
                    <TextField
                        className="sign-in-form-input"
                        label="Your email"
                        color="primary"
                               // value={value}
                        onChange={() => {}}
                    />
                    <TextField
                        className="sign-in-form-input"
                        label="Your password"
                        color="primary"
                        type="password"
                        // value={value}
                        onChange={() => {}}
                    />
                    <div className="sign-in-form-forgot-password">
                        <Link to={'/reset-password'}>Forgot Password?</Link>
                    </div>
                    <StyledButton
                        color="primary"
                        fullWidth
                    >
                        SIGN IN
                    </StyledButton>
                    <span className="sign-in-form-sign-with">Or Sign in with:</span>
                </div>
                <div className="sign-in-form-social-wrapper">
                    <StyledIconButton className="sign-in-form-social">
                        <FacebookIcon />
                    </StyledIconButton>
                    <StyledIconButton className="sign-in-form-social">
                        <TwitterIcon />
                    </StyledIconButton>
                </div>
                <hr/>
                <span className="sign-in-form-sign-up">
                    Not a member?
                    <Link to={'/sign-up'}> Sign up </Link>
                </span>
            </div>
        </Modal>
    );
};

export default SignIn;

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
