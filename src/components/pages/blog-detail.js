import React, { Component } from "react";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogFeatureImage from "../blog/blog-feature-image";
import BlogForm from "../blog/blog-form";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
    this.handleSuccessfulEditSubmit = this.handleSuccessfulEditSubmit.bind(
      this
    );
  }

  handleSuccessfulEditSubmit(blog) {
    this.setState({
      blogItem: blog,
      editMode: false
    });
  }

  handleFeaturedImageDelete() {
    this.setState({
      blogItem: {
        featured_image_url: ""
      }
    });
  }

  handleEditClick() {
    console.log("I was clicked yooo");
    this.setState({
      editMode: true
    });
  }

  getBlogItem() {
    Axios.get(
      `https://anthonygallegos.devcamp.space/portfolio/portfolio_blogs/${
        this.state.currentId
      }`
    )
      .then(response => {
        console.log("response", response);
        this.setState({
          blogItem: response.data.portfolio_blog
        });
      })
      .catch(error => {
        console.log("getBlogItem error", error);
      });
  }

  componentDidMount() {
    this.getBlogItem();
  }
  render() {
    const {
      title,
      blog_status,
      featured_image_url,
      content
    } = this.state.blogItem;

    const contentManager = () => {
      if (this.state.editMode) {
        return (
          <BlogForm
            editMode={this.state.editMode}
            blog={this.state.blogItem}
            handleFeaturedImageDelete={this.handleFeaturedImageDelete}
            handleSuccessfulEditSubmit={this.handleSuccessfulEditSubmit}
          />
        );
      } else {
        return (
          <div className="content-wrapper">
            <h1 onClick={this.handleEditClick}>{title}</h1>

            <BlogFeatureImage img={featured_image_url} />

            <div className="content">{ReactHtmlParser(content)}</div>
          </div>
        );
      }
    };

    return <div className="blog-container-wrapper">{contentManager()}</div>;
  }
}
