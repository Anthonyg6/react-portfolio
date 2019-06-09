import React, { Component } from "react";
import LogoImg from "../../../static/assets/images/auth.jpg";
import Login from "../auth/login";

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnSucessfulAuth = this.handleUnSucessfulAuth.bind(this);
  }

  handleSuccessfulAuth() {
    this.props.handleSuccessfulLogin();
    this.props.history.push("/");
  }

  handleUnSucessfulAuth() {
    this.props.handleUnSuccessfulLogin();
  }
  render() {
    return (
      <div className="auth-page-wrapper">
        <div
          className="left-column"
          style={{
            backgroundImage: `url(${LogoImg})`
          }}
        />

        <div className="right-column">
          <Login
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnSucessfulAuth={this.handleUnSucessfulAuth}
          />
        </div>
      </div>
    );
  }
}
