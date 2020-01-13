import React from 'react';
import Home from './pages/Home/';
import Header from './components/Header/';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Login from './components/Routes/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/">
          <Home />
        </Route>
          <Route path="/about">
              <div>fkfkfkfkfkf</div>
          </Route>
          <Route path="/users">
              <div>hokhogk</div>
          </Route>
          <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
