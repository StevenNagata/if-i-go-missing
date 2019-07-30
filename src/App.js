import React from 'react';
import './App.css';
import Home from '../src/pages/home';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
    </React.Fragment>)
  }
}

export default App;
