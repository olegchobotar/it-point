import React, {useEffect} from 'react';
import Home from './pages/Home/';
import Article from './pages/Article/';
import Header from './components/Header/';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignIn from './components/Routes/SignIn';
import SignUp from './components/Routes/SignUp';
import Settings from './components/Routes/Settings';
import CreateCompany from './components/Routes/CreateCompany';
import Editor from './components/Editor';
import EditCompany from './pages/EditCompany';
import ArticleCreator from './pages/ArticleEditor';
import ArticleEditor from './pages/ArticleEditor/Editor';
import CompanyInvitation from './pages/CompanyInvitation';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { compose } from 'redux';
import isValidToken from './actions/user/isValidToken';

import './App.css';
import {connect} from "react-redux";

function App(props) {
    // useEffect(() => {
    //     props.isValidToken();
    // }, []);
    return (
        <div className="App">
            <Router>
                <Header/>
                <NotificationContainer />
                <Route exact path="/" component={Home}/>
                <Route exact path="/articles/:id" component={Article}/>
                <Route exact path="/articles/:id/edit" component={ArticleEditor}/>
                <Route exact path="/article-creator" component={ArticleCreator}/>
                <Route path="/sign-in" component={SignIn}/>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/profile" component={Editor}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/create-company" component={CreateCompany}/>
                <Route path="/edit-company" component={EditCompany}/>
                <Route path="/company/verify/" component={CompanyInvitation}/>
            </Router>
        </div>
    );
}

export default compose(
    connect(
        null,
        {isValidToken}
        ),
)(App);
