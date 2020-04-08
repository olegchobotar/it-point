import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Toggle from 'react-toggle';
import ImageUploader from 'react-images-upload';
import ReactTags from '../../components/CategoriesInput';
import Editor from '../../components/Editor';
import 'react-toggle/style.css';
import axios from "axios";
import Button from './../../components/Button';
import {connect} from "react-redux";
import {addBubble, Bubble} from "../../basic/helpers/bubbles";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './style.css';

function TabPanel(props) {
    const { children, tab, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={tab !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {tab === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    tab: PropTypes.any.isRequired,
};

const a11yProps = index => ({
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
}));

const ArticleCreator = props => {
    const { article, update, articleId } = props;
    const [title, setTitle] = useState(article.title || '');
    const [categories, setCategories] = useState(article.categories || []);
    const [imageUrl, setImageUrl] = useState(article.imageUrl || '');
    const [content, setContent] = useState(article.content || '');
    const [companyScope, setCompanyScope] = useState(article.companyScope || false);
    let editor = null;

    const classes = useStyles();
    const [tab, setTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const setEditorInstanceRef = instance => {
        editor = instance;
    };

    const clearFields = () => {
        setTitle('');
        setCategories([]);
        setImageUrl('');
        setContent('');
        setCompanyScope(false);
    };

    const onDelete = currentIndex => {
        setCategories(categories.filter((tag, index) => index !== currentIndex))
    };

    const onAddition = category => {
        setCategories(([...categories, category]));
    };

    const onDrag = (category, currentPosition, newPosition) => {
        const newCategories = categories.slice();
        newCategories.splice(currentPosition, 1);
        newCategories.splice(newPosition, 0, category);

        setCategories(newCategories);
    };

    const toggleCompanyScope = () => {
        setCompanyScope(!companyScope);
    };

    const publishArticle = async () => {
        const contentInput = await editor.save();
        const params = {
            title,
            companyScope,
            imageUrl,
            content: contentInput,
            categories: categories.map(category => category.name),
        };
        const call = update ? axios.put : axios.post;
        const url = articleId ? `http://localhost:5000/api/v1/articles/${articleId}` : 'http://localhost:5000/api/v1/articles';
        call(url, params,{
            headers: {
                'x-access-token': localStorage.token,
            }
        })
            .then(() => {
                addBubble('Published');
                clearFields();
            })
            .catch(({ response: { data: { message } } }) => {
                addBubble(message, Bubble.Error)
            });
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="General" {...a11yProps('general')} />
                    <Tab label="Content" {...a11yProps('content')} />

                </Tabs>
            </AppBar>
            <TabPanel tab={tab} index={0}>
                <div className="article-creator-wrapper">
                    <div className="article-creator-header">
                        <h2>{update ? 'Update article' : 'Create new Article'}</h2>
                    </div>
                    <TextField
                        label="Title"
                        className="article-creator-full-width-input"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <div className="toggle-wrapper">
                        <label htmlFor='only-for-company'>Only for company</label>
                        <Toggle
                            disabled={!props.isCompanyMember}
                            id='only-for-company'
                            onChange={toggleCompanyScope} />
                    </div>
                    <TextField
                        label="Image URL"
                        value={imageUrl}
                        className="article-creator-full-width-input"
                        onChange={event => setImageUrl(event.target.value)}
                    />
                    <p>Categories</p>
                    <ReactTags
                        categories={categories}
                        placeholder="Enter category"
                        onDelete={onDelete}
                        onAddition={onAddition}
                        onDrag={onDrag}
                    />
                    <Button width="400px" onClick={() => setTab(1)}>Next</Button>
                </div>
            </TabPanel>
            <TabPanel tab={tab} index={1}>
                <Editor setInstanceRef={setEditorInstanceRef} data={content} />
                <Button width="400px" onClick={publishArticle}>Publish</Button>
            </TabPanel>
        </div>
    );
};

ArticleCreator.propTypes = {
    article: PropTypes.object,
    update: PropTypes.bool,
};

ArticleCreator.defaultProps = {
    article: {},
    update: false,
};

const mapStateToProps = state => ({
    isCompanyMember: state.Company.company,
});

export default connect(mapStateToProps)(ArticleCreator);
