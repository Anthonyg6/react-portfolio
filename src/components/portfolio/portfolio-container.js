import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-items";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my page",
      isLoading: false,
      data: []
    };

    this.handleFilter = this.handleFilter.bind(this);
    // this was all added just to test the axios library. Below is pulling a get request on how to pull live data back via an api call. We have to bind the getPortfolioItems function to the "this" so that it is able to be called within the render function and pulled into our app.
    //this.getPortfolioItems = this.getPortfolioItems.bind(this);
  }

  // using the filter function to filter over the data elements that are in the intial state we are able to group the data by its category and render/set a new state of just those items
  handleFilter(filter) {
    if (filter === "CLEAR_FILTERS") {
      this.getPortfolioItems();
    } else {
      this.getPortfolioItems(filter);
    }
  }

  getPortfolioItems(filter = null) {
    axios
      .get("https://anthonygallegos.devcamp.space/portfolio/portfolio_items")
      .then(response => {
        if (filter) {
          this.setState({
            data: response.data.portfolio_items.filter(item => {
              return item.category === filter;
            })
          });
        } else {
          // console.log("response data",response);
          this.setState({
            data: response.data.portfolio_items
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  portfolioItems() {
    return this.state.data.map(item => {
      // console.log("PortfolioItem", item) this syntax allows you to output the data in the console log in the browser so we are able to see what kind of data we have access too that is coming in from an API, this is used if we don't know the type of data that is getting pulled in.
      return <PortfolioItem key={item.id} item={item} />; // props
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Is Loading...</div>;
    }

    return (
      <div className="homepage-wrapper">
        <div className="filter-links">
          <button
            className="btn"
            onClick={() => this.handleFilter("Social Media")}
          >
            Social Media
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Automotive")}
          >
            Automotive
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Search Engine")}
          >
            Search Engine
          </button>
          <button className="btn" onClick={() => this.handleFilter("Game")}>
            Game
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("CLEAR_FILTERS")}
          >
            Show All
          </button>
        </div>
        <div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
      </div>
    );
  }
}
