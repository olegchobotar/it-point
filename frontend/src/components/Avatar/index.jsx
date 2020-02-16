import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { getUserInitials } from '../../basic/helpers/user';
import PropTypes from 'prop-types';

import './style.css';

const useStyles = makeStyles({
    avatar: {
        height: props => props.size,
        width: props => props.size,
    },
});

const Article = props => {
    const { user } = props;
    const classes = useStyles(props);

    return (
        <Avatar aria-label="recipe" className={classes.avatar}>
            {getUserInitials(user)}
        </Avatar>
    );
};

Article.defaultProps = {
    size: 40,
};

Article.propTypes = {
    size: PropTypes.number,
};

export default Article;
