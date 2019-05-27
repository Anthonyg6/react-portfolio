import React, { Component } from "react";
import axios from "axios";

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

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);

    return formData;
  }

  handleFormSubmit(event) {
    axios
      .post(
        "https://anthonygallegos.devcamp.space/portfolio/portfolio_blogs",
        this.buildForm(),
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
        this.props.handleSuccessfulFormSubmit(response.data.portfolio_blog);

        // check with mentor on why this causes a memory leak when attempting to set the state back to an empty string!!
        // this.setState({
        //   title: "",
        //   blog_status: ""
        // });
      })
      .catch(error => {
        console.log("handleFormSubmit", error);
      });
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
