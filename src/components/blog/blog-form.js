import React, { Component } from "react";
import axios from "axios";
import RichTextEditors from "../forms/rich-text-editors";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blog_status: "",
      content: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(
      this
    );
  }

  handleRichTextEditorChange(content) {
    this.setState({ content });
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);
    formData.append("portfolio_blog[content]", this.state.content);

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
        this.props.handleSuccessfulFormSubmit(response.data.portfolio_blog);

        // check with mentor on why this causes a memory leak when attempting to set the state back to an empty string!!
        this.setState({
          title: "",
          blog_status: ""
        });
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
      <form onSubmit={this.handleFormSubmit} className="blog-form-wrapper">
        <div className="two-column">
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
        </div>

        <div className="one-column">
          <RichTextEditors
            handleRichTextEditorChange={this.handleRichTextEditorChange}
          />
        </div>

        <button className="btn">Save</button>
      </form>
    );
  }
}
