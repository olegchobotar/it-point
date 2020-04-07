import React, {useEffect, useState} from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getUserInitials } from '../../basic/helpers/user';
import Editor from '../../components/Editor';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
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
    editButton: {
        position: 'fixed',
        margin: 0,
        top: 'auto',
        right: 30,
        bottom: 50,
        left: 'auto',
        background: '#eeeeee',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    },
});

const Article = props => {
    const [article, setArticle] = useState({});

    const fetchAPI = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/v1/articles/${props.match.params.id}`);
        console.log(data)
        setArticle(data);
    };

    const {
        id,
        title,
        categories,
        author,
        image_url: imageUrl,
        content,
        author_id: authorId,
        modified_date: date,
    } = article;

    useEffect( () => {
        fetchAPI();
    },[]);

    const handleEditClick = () => {
        props.history.push(`/articles/${id}/edit`);
    };

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
                       <Editor readOnly={true} editorValue={content} />
                    </CardContent>
                </CardActionArea>
            </Card>
            {console.log(props.userId, id)}
            {props.userId === authorId && (
                <IconButton onClick={handleEditClick} aria-label="edit" className={classes.editButton} >
                    <EditIcon fontSize="inherit" />
                </IconButton>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    userId: get(state, 'User.currentUser.id') || null,
});

export default compose(
    withRouter,
    connect(
        mapStateToProps
    )
)(Article);
