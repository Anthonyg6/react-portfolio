import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.activateScroll();
  }

  activateScroll() {
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        console.log("get more posts");
      }
    };
  }

  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
    axios
      .get("https://anthonygallegos.devcamp.space/portfolio/portfolio_blogs", {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          blogItems: response.data.portfolio_blogs,
          totalCount: response.data.meta.total_records,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("getBlogItems error", error);
      });
  }

  componentWillMount() {
    this.getBlogItems();
  }

  render() {
    const blogRecord = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });
    return (
      <div className="blog-container-wrapper">
        <div className="content-wrapper">{blogRecord}</div>
        {this.state.isLoading === true ? (
          <div className="content-loader">
            <FontAwesomeIcon icon="circle-notch" spin />
          </div>
        ) : null}
      </div>
    );
  }
}
