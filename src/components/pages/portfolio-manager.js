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
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

   getPortfolioManagerItems() {
        axios.get('https://anthonygallegos.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc', {withCredentials: true})
        .then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleSuccessfulFormSubmission(portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })
    }

    handleFormError(error) {
        console.log("handleFormError error", error)
    }

    handleDeleteClick(portfolioItem) {
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
            {withCredentials: true}
        ).then(response => {
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(item => {
                   return item.id !== portfolioItem.id
                })
            })
            return response.data;
        }).catch(error => {
            console.log("handleDeleteClick", error)
        });   
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
            <PortfolioSideBar
            handleDeleteClick={this.handleDeleteClick}
            data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}