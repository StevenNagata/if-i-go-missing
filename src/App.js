import React from 'react';
import './App.css';
import Home from '../src/pages/home';
import Navigation from '../src/components/NavBar';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div> 
        <Navigation/>
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
    </React.Fragment>
    </div>)
  }
}

export default App;
