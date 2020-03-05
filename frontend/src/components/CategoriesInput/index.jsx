import React, {useEffect, useState} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './style.css';
import axios from "axios";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default props => {
    const [suggestions, setSuggestions] = useState([]);

    const { handleDelete, handleAddition, handleDrag, categories, placeholder } = props;

    const fetchAPI = async () => {
        const { data } = await axios.get('http://localhost:5000/api/v1/categories');
        setSuggestions(data);
    };

    useEffect( () => {
        fetchAPI();
    },[]);

    return (
        <ReactTags
            tags={categories}
            placeholder={placeholder || 'Add new category'}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            suggestions={suggestions}
            delimiters={delimiters}/>
    );
};
