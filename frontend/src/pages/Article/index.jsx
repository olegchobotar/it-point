import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getUserInitials } from '../../basic/helpers/user';

import './style.css';
import axios from "axios";

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
    const [article, setArticle] = useState([]);

    const fetchAPI = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/v1/articles/${props.match.params.id}`);
        console.log(data)
        setArticle(data);
    };

    useEffect( () => {
        fetchAPI();
    },[]);

    const {
        id,
        title,
        categories,
        author,
        image_url: imageUrl,
        content,
        modified_date: date,
    } = article;
    const classes = useStyles();
    return (
        <div className='article-wrapper'>
            <Card mx="auto" className={classes.card}>
                <div style={{backgroundColor: '#4be4dc',
                    padding: '0.5rem 0',
                    textAlign: 'center'}}
                >
                    <span className="card-item-category">{categories ? categories.join(', ') : ''}</span>
                </div>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={imageUrl}
                        title={title}
                    />
                    <CardHeader
                        className={classes.header}
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {getUserInitials(author)}
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
                            {content}
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

export default Article;
