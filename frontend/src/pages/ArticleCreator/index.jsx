import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toggle from 'react-toggle';
import ImageUploader from 'react-images-upload';
import { WithContext as ReactTags } from 'react-tag-input';

import './style.css';
import 'react-toggle/style.css';
import axios from "axios";
import {styled} from "@material-ui/styles";
import Button from './../../components/Button';
import {connect} from "react-redux";

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
    const [companyScope, setCompanyScope] = useState(false);
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

    const toggleCompanyScope = () => {
        setCompanyScope(!companyScope);
    };

    const publishArticle = async () => {
        const params = {
            title,
            companyScope,
            imageUrl,
            content,
            categories: categories.map(category => category.text),
        };
        const result = await axios.post('http://localhost:5000/api/v1/articles', params,
            {
                headers: {
                    'x-access-token': localStorage.token,
                }
            });
        console.log(result.data);
    };

    return (
        <div className="article-creator-wrapper">
            <div className="article-creator-header">
                <h2>Create new Article</h2>
            </div>
            <TextField
                label="Title"
                className="article-creator-full-width-input"
                onChange={event => setTitle(event.target.value)}
            />
            <div className="toggle-wrapper">
                <label htmlFor='only-for-company'>Only for company</label>
                <Toggle
                    disabled={!props.isCompanyMember}
                    id='only-for-company'
                    onChange={toggleCompanyScope} />
            </div>
            {/*<ImageUploader*/}
                {/*withIcon={true}*/}
                {/*singleImage={true}*/}
                {/*buttonText='Choose images'*/}
                {/*onChange={() => {}}*/}
                {/*imgExtension={['.jpg', '.gif', '.png', '.gif']}*/}
                {/*maxFileSize={5242880}*/}
            {/*/>*/}
            <TextField
                label="Image URL"
                className="article-creator-full-width-input"
                onChange={event => setImageUrl(event.target.value)}
            />
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
                className="article-creator-full-width-input"
                multiline
                rows="5"
                onChange={event => setContent(event.target.value) }
            />
            <Button width="400px" onClick={publishArticle}>Publish</Button>
        </div>

    );
};
const mapStateToProps = state => ({
    isCompanyMember: state.Company.company,
});

export default connect(mapStateToProps)(ArticleCreator);
