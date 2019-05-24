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
        // the this.state.isLoading || is used if the user has slow internet or if they attempt to scroll before the content is fully loaded it will not began to run any of the code until the page is OUT of the isLoading state
        this.state.isLoading ||
        this.state.blogItems.length === this.state.totalCount
      ) {
        return;
      }

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.getBlogItems();
      }
    };
  }

  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
    axios
      .get(
        `https://anthonygallegos.devcamp.space/portfolio/portfolio_blogs?page=${
          this.state.currentPage
        }`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        console.log("getting", response);
        this.setState({
          blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
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
