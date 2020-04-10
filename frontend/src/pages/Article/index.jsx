import React, {useEffect, useState} from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { compose} from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Avatar from '../../components/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Editor from '../../components/Editor';
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
        zIndex: 1000,
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
    let editorRef = null;

    const fetchAPI = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/v1/articles/${props.match.params.id}`);
        console.log(data)
        setArticle(data);
    };

    const setEditorRef = instanceRef => {
        editorRef = instanceRef;
        // instanceRef.render();
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
        <div className='article-page-wrapper'>
            <div className="article-page-header">
                <span className="card-item-category">{categories ? categories.join(' | ') : ''}</span>
                <h2>{title}</h2>
                <div className="article-page-author">
                    <Avatar user={author}/>
                    {author}
                </div>
            </div>
            {content && <Editor setInstanceRef={setEditorRef} data={content}/>}
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
