import React, { Component } from 'react';
import LogoImg from '../../../static/assets/images/auth.jpg';

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
          <h1>Auth info goes here</h1>
        </div>
      </div>
    )
  }
}