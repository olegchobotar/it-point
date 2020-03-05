import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '../Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
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
        content,
        created_date: createdDate,
    } = props;
    const classes = useStyles();

    const handleRedirection = () => {
        props.history.push(`/articles/${id}`);
    };

    return (
        <div className='article-wrapper'>
            <Card mx="auto" className={classes.card}>
                <div style={{backgroundColor: '#4be4dc',
                    padding: '0.5rem 0',
                    textAlign: 'center'}}
                >
                    <span className="card-item-category">{categories ? categories[0] : 'ni'}</span>
                </div>
                <CardActionArea
                    onClick={handleRedirection}
                >
                    <CardMedia
                        className={classes.media}
                        image={imageUrl}
                        title={title}
                    />
                    <CardHeader
                        className={classes.header}
                        avatar={
                            <Avatar user={author} />
                        }
                        title={author}
                        subheader={createdDate}
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default withRouter(Article);
