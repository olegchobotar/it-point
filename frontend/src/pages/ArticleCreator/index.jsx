import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { WithContext as ReactTags } from 'react-tag-input';
import Editor from '../../components/Editor';

import './style.css';
import axios from "axios";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

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

const ArticleCreator = props => {
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');

    const fetchAPI = async () => {
        const { data } = await axios.get('http://localhost:5000/api/v1/categories');
        console.log(data);
        setSuggestions(data);
    };

    useEffect( () => {
        fetchAPI();
    },[]);

    const handleDelete = currentIndex => {
        setCategories(categories.filter((tag, index) => index !== currentIndex))
    };

    const handleAddition = category => {
        setCategories(([...categories, category]));
    };

    const handleDrag = (category, currentPosition, newPosition) => {
        const newCategories = categories.slice();
        newCategories.splice(currentPosition, 1);
        newCategories.splice(newPosition, 0, category);

        setCategories(newCategories);
    };

    return (
        <div className="article-creator-wrapper">
            <div className="article-creator-header">
                <h2>Create new Article</h2>
            </div>
            <TextField label="Title" onChange={event => setTitle(event.target.value) }/>
            <p>Categories</p>
            <ReactTags
                tags={categories}
                placeholder="Add new category"
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                suggestions={suggestions}
                delimiters={delimiters}/>
            <TextField
                label="Content"
                multiline
                rows="5"
                onChange={event => setContent(event.target.value) }
            />
        </div>

    );
};

export default ArticleCreator;
