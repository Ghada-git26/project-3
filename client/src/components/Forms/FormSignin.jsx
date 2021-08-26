import React, { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";


class FormSignin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (

      <div className="login-form card shadow">
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <h2 className="text-center">Sign in</h2>
          <div className="form-group">
            <label>Email</label>
            <input type="email" id="email" name="email" className="form-control" placeholder="Email" required="required" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="Password" required="required" />
          </div>
          <div className="mt-2 text-center">
            <button type="submit" className="btn btn-outline-primary">Sign In</button>
            <p className="text-center mt-2">Not a user? <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
      </div>
    )
  };
}

export default withRouter(withUser(FormSignin));
