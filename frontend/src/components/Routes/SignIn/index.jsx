import React, { useState } from 'react';
import Modal from '../../Modal';
import { TextField, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Button from '../../../components/Button';
import loginUser from '../../../actions/user/loginUser';
import './styles.css';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addBubble, Bubble } from '../../../basic/helpers/bubbles';
import { withRouter } from 'react-router';

const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLoginBtnClick = async () => {
        props.loginUser(email, password)
            .then(
                () => {
                    props.history.push('/');
                })
            .catch(({ response: { data: { message } } }) => {
                addBubble(message, Bubble.Error)
            });
    };
    return (
        <Modal title="Sign in">
            <form>
                <div>
                    <div>
                        <TextField
                            className="sign-in-form-input"
                            label="Your email"
                            color="primary"
                            // value={value}
                            onChange={(event) => {setEmail(event.target.value)}}
                        />
                        <TextField
                            className="sign-in-form-input"
                            label="Your password"
                            color="primary"
                            type="password"
                            // value={value}
                            onChange={(event) => {setPassword(event.target.value)}}
                        />
                        <div className="sign-in-form-forgot-password">
                            <Link to={'/reset-password'}>Forgot Password?</Link>
                        </div>
                        <Button
                            color="primary"
                            fullWidth
                            onClick={handleLoginBtnClick}
                        >
                            SIGN IN
                        </Button>
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
            </form>

        </Modal>
    );
};

export default compose(
    connect(
        null,
        { loginUser }
    ),
    withRouter,
)(SignIn);

const StyledIconButton = styled(IconButton) ({
    borderRadius: 50,
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
    width: '70px',
});
