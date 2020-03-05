import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { getUserInitials } from '../../basic/helpers/user';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    avatar: {
        height: props => props.size,
        width: props => props.size,
        background: '#8a8a8a',
        color: '#3e3e3e !important',
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
