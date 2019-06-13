import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      blogModalIsOpen: false
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfulBlogSubmission = this.handleSuccessfulBlogSubmission.bind(
      this
    );

    this.handleBlogDelete = this.handleBlogDelete.bind(this);
  }

  handleBlogDelete(blog) {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
          blogItems: this.state.blogItems.filter(blogItem => {
            return blog.id !== blogItem.id;
          })
        });
        return response.data;
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  handleSuccessfulBlogSubmission(blog) {
    this.setState({
      blogModalIsOpen: false,
      blogItems: [blog].concat(this.state.blogItems)
    });
  }

  handleModalClose() {
    this.setState({
      blogModalIsOpen: false
    });
  }

  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true
    });
  }

  onScroll() {
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
        console.log("getting", response.data); // this will show the type of data that we are working with.
        this.setState({
          //we are concating the current state of blog items with the new response once the bottom of the page is hit.
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

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const blogRecord = this.state.blogItems.map(blogItem => {
      if (this.props.loggedInStatus === "LOGGED_IN") {
        return (
          <div key={blogItem.id} className="admin-wrapper">
            <BlogItem blogItem={blogItem} />
            <a
              className="delete-icon"
              onClick={() => this.handleBlogDelete(blogItem)}
            >
              <FontAwesomeIcon icon="trash-alt" />
            </a>
          </div>
        );
      } else {
        return <BlogItem key={blogItem.id} blogItem={blogItem} />;
      }
    });

    return (
      <div className="blog-container-wrapper">
        <BlogModal
          handleSuccessfulBlogSubmission={this.handleSuccessfulBlogSubmission}
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.blogModalIsOpen}
        />

        {this.props.loggedInStatus === "LOGGED_IN" ? (
          <div className="blog-link">
            <a onClick={this.handleNewBlogClick}>
              <FontAwesomeIcon icon="plus" />
            </a>
          </div>
        ) : null}

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
