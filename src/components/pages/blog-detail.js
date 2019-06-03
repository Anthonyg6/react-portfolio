import React, { Component } from "react";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogFeatureImage from "../blog/blog-feature-image";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {}
    };
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
    return (
      <div>
        <div className="blog-container-wrapper">
          <div className="content-wrapper">
            <h1>{title}</h1>

            <BlogFeatureImage img={featured_image_url} />

            <div className="content">{ReactHtmlParser(content)}</div>
          </div>
        </div>
      </div>
    );
  }
}
