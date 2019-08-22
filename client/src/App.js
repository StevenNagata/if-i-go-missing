import React from "react";
import "./App.css";
import MyInfo from "../src/pages/home";
import Trusties from "../src/pages/trusties";
import Entrusties from "../src/pages/entrusties";
import Navigation from "../src/components/NavBar";
import MissingPerson from "../src/pages/missingPerson";
import Login from "../src/pages/login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { MyProvider } from "../src/contexts/appContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")) || null,
      isAuth: localStorage.getItem("user") ? true : false
    };
  }
  updateUser = (user, isAuth) => this.setState({ user, isAuth });
  updateUserAccounts = accounts => {
    fetch("/updateInfo", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id: this.state.user.id, accounts: accounts })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data });
      });
  };
  updateMissingFlag = (id, user) => {
    fetch("updateMissingFlag/", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id, user, requesterId: this.state.user.id })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data[0] });
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(data[0]))
      });
  };
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
                  render={props =>
                    this.state.isAuth ? (
                      <MyInfo
                        {...props}
                        accounts={this.state.user.accounts}
                        updateUserAccounts={this.updateUserAccounts}
                      />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
                <Route
                  exact
                  path="/myTrusties"
                  render={props =>
                    this.state.isAuth ? (
                      <Trusties
                        {...props}
                        trusties={this.state.user.trusties}
                      />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
                <Route
                  exact
                  path="/myEntrusties"
                  render={props =>
                    this.state.isAuth ? (
                      <Entrusties
                        {...props}
                        entrusties={this.state.user.entrusties}
                        updateMissingFlag={this.updateMissingFlag}
                      />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
                <Route
                  exact
                  path="/missingPerson"
                  render={props =>
                    this.state.isAuth ? (
                      <MissingPerson
                        {...props}
                        requesterId={this.state.user.id}
                      />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
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
