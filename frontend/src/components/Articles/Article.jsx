import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '../Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tag from '../../components/Tag';
import { withRouter } from 'react-router';

import './style.css';

const useStyles = makeStyles({
    card: {
        maxWidth: 1000,
        margin: 'auto',
    },
    header: {
        textAlign: 'left',
    },
    media: {
        height: 300,
        objectFit: 'fill'
    },
});

const Article = props => {
    const {
        id,
        title,
        categories,
        author,
        image_url: imageUrl,
        created_date: createdDate,
    } = props;
    const classes = useStyles();

    const handleRedirection = () => {
        props.history.push(`/articles/${id}`);
    };

    const formattedDate = new Date(createdDate)
    return (
        <div className="tile-article-wrapper" onClick={handleRedirection}>
            <img src={imageUrl} />
            <div className="tile-article-content">
                <div>
                    {categories.map(tag => (
                        <Tag key={tag} tag={tag} />
                    ))}
                </div>
                <h3 className="tile-article-title">{title}</h3>
                <div className="tile-article-footer">
                    by <strong>{author} </strong>&#8226; {formattedDate.toDateString()}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Article);
