import React, { Component } from "react";
import axios from "axios";

import PortfolioSideBar from "../portfolio/portfolio-list-sidebar";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: [],
      portfolioItemToEdit: {}
    };

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormError = this.handleFormError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
  }

  clearPortfolioToEdit() {
    this.setState({
      portfolioItemToEdit: {}
    });
  }

  handleEditFormSubmission() {
    this.getPortfolioManagerItems();
  }

  handleNewFormSubmission(portfolioItem) {
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
    });
  }

  handleFormError(error) {
    console.log("handleFormError error", error);
  }

  handleEditClick(portfolioItem) {
    this.setState({
      portfolioItemToEdit: portfolioItem
    });
  }

  handleDeleteClick(portfolioItem) {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/portfolio_items/${
          portfolioItem.id
        }`,
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
          portfolioItems: this.state.portfolioItems.filter(item => {
            return item.id !== portfolioItem.id;
          })
        });
        return response.data;
      })
      .catch(error => {
        console.log("handleDeleteClick", error);
      });
  }

  getPortfolioManagerItems() {
    axios
      .get(
        "https://anthonygallegos.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
          portfolioItems: [...response.data.portfolio_items]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getPortfolioManagerItems();
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <PortfolioForm
            handleNewFormSubmission={this.handleNewFormSubmission}
            handleEditFormSubmission={this.handleEditFormSubmission}
            handleFormError={this.handleFormError}
            clearPortfolioToEdit={this.clearPortfolioToEdit}
            portfolioItemToEdit={this.state.portfolioItemToEdit}
          />
        </div>
        <div className="right-column">
          <PortfolioSideBar
            handleEditClick={this.handleEditClick}
            handleDeleteClick={this.handleDeleteClick}
            data={this.state.portfolioItems}
          />
        </div>
      </div>
    );
  }
}
