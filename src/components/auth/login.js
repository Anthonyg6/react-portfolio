import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:"",
            password:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        axios.post("https://api.devcamp.space/sessions",
        {
            client: {
                email: this.state.email,
                password: this.state.password,
                errorText: ""
            }
        },
        {withCredentials: true}
    ).then(response => {
        if (response.data.status === "created") {
            console.log("You are in!")
        } else {
            this.setState({
                errorText: "You have passed in the wrong email and/or password"
            })
        }
    }).catch(error => {
        this.setState({
            errorText: "Some error has occured"
        })
    });
        event.preventDefault();
        
    }

  render() {
    return (
      <div>
        <h1>LOGIN TO ACCESS DASHBOARD</h1>

        <div>{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="Your email goes here!"
                value={this.state.email}
                onChange={this.handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Enter password!"
                value={this.state.password}
                onChange={this.handleChange}
            />

            <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}