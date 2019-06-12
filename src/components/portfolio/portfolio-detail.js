import React, { Component } from "react";
import axios from "axios";
import PortfolioItem from "./portfolio-items";

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.setState = {
      portfolioItem: ""
    };

    this.getPortfolioItem = this.getPortfolioItem.bind(this);
  }

  getPortfolioItem() {
    axios
      .get(
        `https://anthonygallegos.devcamp.space/portfolio/portfolio_items/${
          this.props.match.params.slug
        }`
      )
      .then(response => {
        console.log("response", response);
      })
      .catch(error => {
        console.log("error in getPortfolioItem", error);
      });
  }

  componentWillMount() {
    this.getPortfolioItem();
  }
  render() {
    return (
      <div>
        <h2>Portfolio Detail for {this.props.match.params.slug}</h2>
      </div>
    );
  }
}
