import React, { Component } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then(() => {
        this.props.history.push("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (

      <div className="login-form card shadow">
        <form onSubmit={this.handleSubmit}>
          <h2 className="text-center">Sign Up</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Email"
              required="required" onChange={this.handleChange}
              value={this.state.email} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              required="required" />
          </div>
          <div className="mt-2 text-center">
            <button type="submit" className="btn btn-outline-primary">Create Account</button>
            <p className="text-center mt-2">Already a user? <Link to="/signin">Sign In</Link></p>
          </div>
        </form>

      </div>
    );
  }
}

export default withRouter(withUser(FormSignup));
