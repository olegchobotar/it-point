import React, {useEffect, useState} from 'react';
import ReactTags from 'react-tag-autocomplete'
import './style.css';
import axios from "axios";

export default props => {
    const [suggestions, setSuggestions] = useState([]);

    const { onDelete, onAddition, onDrag, categories, placeholder } = props;

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
            onDelete={onDelete}
            onAddition={onAddition}
            onDrag={onDrag}
            suggestions={suggestions}
            allowNew={true}
        />
    );
};
