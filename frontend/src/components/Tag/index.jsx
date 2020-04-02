import React from 'react';

import {connect} from 'react-redux';
import logoutUser from '../../actions/user/logoutUser';
import {compose} from "redux";
import {withRouter} from "react-router";

import './styles.css';

const Tag = props => {
    const { tag } = props;
    return (
        <span className="article-tag">
            <strong>{tag.toUpperCase()}</strong>
        </span>
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
)(Tag);
