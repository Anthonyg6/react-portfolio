import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:"",
            password:""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log("handle submit", event)
    }

  render() {
    return (
      <div>
        <h1>LOGIN TO ACCESS DASHBOARD</h1>
        <form>
            <input onSubmit={this.handleSubmit}
                type="email"
                name="email"
                placeholder="Your email goes here!"
                value={this.state.value}
                onChange={this.handleChange}
            />
            <input onSubmit={this.handleSubmit}
                type="password"
                name="password"
                placeholder="Enter password!"
                value={this.state.value}
                onChange={this.handleChange}
            />

            <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}