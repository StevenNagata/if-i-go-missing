import React from "react";
import "./App.css";
import MyInfo from "../src/pages/home";
import Trusties from "../src/pages/trusties";
import Entrusties from "../src/pages/entrusties";
import Navigation from "../src/components/NavBar";
import Login from "../src/pages/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MyProvider } from "../src/contexts/appContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')) || null,
      isAuth: localStorage.getItem('user') ? true : false
    };
  }
  updateUser = (user, isAuth) => this.setState({ user, isAuth });
  updateUserAccounts = (accounts) => {
    fetch('/updateInfo', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({id: this.state.user.id, accounts: accounts})
    })
    .then(res => res.json())
    .then(data => {
      this.setState({user: data})
    })
  }
  render() {
    return (
      <div>
        <MyProvider>
          <React.Fragment>
            <Router>
              <Navigation appState={this.state} updateUser={this.updateUser} />
              <Switch>
                <Route
                  exact
                  path="/myInfo"
                  render={props => (
                    <MyInfo {...props} 
                    accounts={this.state.user.accounts}
                    updateUserAccounts={this.updateUserAccounts} />
                  )}
                />
                <Route exact path="/myTrusties" component={Trusties} />
                <Route exact path="/myEntrusties" component={Entrusties} />
                <Route
                  exact
                  path="/login"
                  render={props => (
                    <Login {...props} updateUser={this.updateUser} />
                  )}
                />
              </Switch>
            </Router>
          </React.Fragment>
        </MyProvider>
      </div>
    );
  }
}

export default App;
