import React from 'react';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo-cropped.png';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import logoutUser from '../../actions/user/logoutUser';
import {compose} from "redux";
import {withRouter} from "react-router";
import { fade, makeStyles } from '@material-ui/core/styles';

import Avatar from '../Avatar';

import './styles.css';

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.45),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.55),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

const Header = props => {
    const { currentUser } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();

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
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={event => console.log(event.target.value)}
                                />
                            </div>
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
