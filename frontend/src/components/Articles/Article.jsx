import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
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
        category,
        author,
        imageUrl,
        description,
        date,
    } = props;
    const classes = useStyles();

    const userInitials = author.split(' ').map(
        word => word.charAt(0).toUpperCase()
    ).join('');

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
                    <span className="card-item-category">{category}</span>
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
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {userInitials}
                            </Avatar>
                        }
                        title={author}
                        subheader={date}
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
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            {/*<img className="article-image" src={imageUrl} alt=""/>*/}
            {/*<h3>{title}</h3>*/}
            {/*<div>*/}
                {/*<span>Posted on {date}</span>*/}
                {/*<span>{author}</span>*/}
            {/*</div>*/}
            {/*<div>{description}</div>*/}
            {/*<button>Read more</button>*/}
        </div>
    );
};

export default withRouter(Article);
