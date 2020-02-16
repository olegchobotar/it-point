import React from 'react';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo-cropped.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import logoutUser from '../../actions/user/logoutUser';

import './styles.css';
import {compose} from "redux";
import {withRouter} from "react-router";
import {getUserInitials} from "../../basic/helpers/user";
import Avatar from '../Avatar';

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

    const handleSignOut = () => {
        setEmptyAnchor();
        props.logoutUser();
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
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
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
