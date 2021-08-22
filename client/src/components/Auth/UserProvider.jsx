import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { UserContext } from "./UserContext";

class UserProvider extends Component {
  state = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
    isAdmin: false
  };

  componentDidMount() {
    apiHandler
      .isLoggedIn()
      .then((data) => {
        this.setState({ user: data, isLoggedIn: true, isLoading: false, isAdmin: data.isAdmin });
      })
      .catch((error) => {
        this.setState({ user: null, isLoggedIn: false, isLoading: false });
      });
  }

  setUser = (user) => {
    this.setState({ user, isLoggedIn: true, isAdmin: user.isAdmin });
  };

  removeUser = () => {
    this.setState({ user: null, isLoggedIn: false, isAdmin: false });
  };

  render() {
    //  Setup all the values/functions you want to expose to anybody reading
    // from the AuthContext.
    const authValues = {
      user: this.state.user,
      setUser: this.setUser,
      removeUser: this.removeUser,
      isLoggedIn: this.state.isLoggedIn,
      isLoading: this.state.isLoading,
      isAdmin: this.state.isAdmin
    };

    return (
      <UserContext.Provider value={authValues}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
