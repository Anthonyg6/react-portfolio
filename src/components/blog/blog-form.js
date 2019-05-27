import React, { Component } from "react";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blog_status: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    this.props.handleSuccessfulBlogSubmit(this.state);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="blog_status"
          placeholder="Blog Status"
          value={this.state.blog_status}
          onChange={this.handleChange}
        />

        <button>Save</button>
      </form>
    );
  }
}
