import React from 'react';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo-cropped.png';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import logoutUser from '../../actions/user/logoutUser';
import {compose} from "redux";
import {withRouter} from "react-router";

import Avatar from '../Avatar';

import './styles.css';

const Header = props => {
    const { currentUser } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const setEmptyAnchor = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        setEmptyAnchor();
        await props.history.push('/');
        props.logoutUser();
    };

    const showSettings = () => {
        setEmptyAnchor();
        props.history.push('/settings');
    };

    const handleLogoClick = () => {
        props.history.push('/');
    };

    return (
        <div className="wrapper">
            <div className="content">
                <img className="logo" src={logo} onClick={handleLogoClick} />
                <div className="actions">
                    <nav>
                        <ul>
                            <li>
                                {currentUser.nickname
                                    ? (
                                        <div className={'actions-dropdown'}>
                                            <div onClick={handleMenu}>
                                                <Avatar user={currentUser.nickname} size={30}/>
                                                {currentUser.nickname}
                                            </div>
                                            <Menu
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={open}
                                                onClose={setEmptyAnchor}
                                            >
                                                <MenuItem onClick={setEmptyAnchor}>Profile</MenuItem>
                                                <MenuItem
                                                    component={Link}
                                                    onClick={setEmptyAnchor}
                                                    to={'/article-creator'}
                                                >
                                                    Create Article
                                                </MenuItem>
                                                <MenuItem onClick={showSettings}>Settings</MenuItem>
                                                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                            </Menu>
                                        </div>
                                    )
                                    : <Link to="/sign-in">Sign In</Link>
                                }
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = state => ({
    currentUser: state.User.currentUser,
});

export default compose(
    withRouter,
    connect(
        mapDispatchToProps,
        { logoutUser },
    )
)(Header);
