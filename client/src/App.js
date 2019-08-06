import React from 'react';
import './App.css';
import Home from '../src/pages/home';
import Trusties from '../src/pages/trusties';
import Entrusties from '../src/pages/entrusties';
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
          <Route exact path="/myTrusties" component={Trusties}/>
          <Route exact path="/myEntrusties" component={Entrusties}/>
        </Switch>
      </Router>
    </React.Fragment>
    </div>)
  }
}

export default App;
