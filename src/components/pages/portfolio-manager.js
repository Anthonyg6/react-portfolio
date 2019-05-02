import React, { Component } from 'react';
import axios from 'axios';

export default class PortfolioManager extends Component {
    constructor() {
        super()

        this.state = {
            portfolioItems: []
        }

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

    componentDidMount() {
        this.getPortfolioManagerItems();
    };

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
            <h1>Portfolio Manager forms...</h1>
        </div>
        <div className="right-column">
            <h1>PortfolioManager side bar...</h1>
        </div>
      </div>
    );
  }
}