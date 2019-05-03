import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSideBar from '../portfolio/portfolio-list-sidebar';
import PortfolioForm from '../portfolio/portfolio-form';


export default class PortfolioManager extends Component {
    constructor() {
        super()

        this.state = {
            portfolioItems: []
        }

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
        this.handleFormError = this.handleFormError.bind(this);
    }

   getPortfolioManagerItems() {
        axios.get('https://anthonygallegos.devcamp.space/portfolio/portfolio_items', {withCredentials: true})
        .then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleSuccessfulFormSubmission(portfolioItems) {
        // TODO
        // update portfolio items state
        // update portfolio items list
    }

    handleFormError(error) {
        console.log("handleFormError error", error)
    }

    componentDidMount() {
        this.getPortfolioManagerItems();
    };

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
            <PortfolioForm
            handleSuccessfulFormSubmission = {this.handleSuccessfulFormSubmission}
            handleFormError = {this.handleFormError}
            />
        </div>
        <div className="right-column">
            <PortfolioSideBar data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}