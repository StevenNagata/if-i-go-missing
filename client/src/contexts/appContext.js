import React from "react";

export const MyApp = React.createContext();

export class MyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuth: false
    };
  }
  login = (user, password) => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user,
        password: password
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.statusCode === 200) {
          this.setState({ user, isAuth: true });
        } else if (data.statusCode === 300) {
          console.log(data.message);
        }
      });
  };
  render() {
    return (
      <MyApp.Provider value={{ user: this.state.user, login: this.login }}>
        {this.props.children}
      </MyApp.Provider>
    );
  }
}
