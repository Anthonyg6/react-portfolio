import React, { Component } from 'react';
import LogoImg from '../../../static/assets/images/auth.jpg';
import Login from '../auth/login';

export default class Auth extends Component {
  render() {
    return (
      <div className = "auth-page-wrapper">
        <div 
        className ="left-column"
        style = {{
          backgroundImage: `url(${LogoImg})`
        }}
        />


        <div className = "right-column">
          <Login />
        </div>
      </div>
    )
  }
}