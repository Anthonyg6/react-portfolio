import React, { Component } from 'react';
import axios from 'axios';

import PortfolioItem from './portfolio-items';

export default class PortfolioContainer extends Component {
    constructor() {
        super()

        this.state = {
            pageTitle: "Welcome to my page",
            isLoading: false,
            data: [
                {"title": "ESM", category: "eCommerce Fulfillment & Distribution", slug: 'esm'},
                {"title": "UPS", category: "eCommerce Fulfillment & Distribution", slug: 'ups'},
                {"title": "turo", category: "Car Rental", slug: 'turo'}
            ]
        };
        
        this.handleFilter = this.handleFilter.bind(this);
        // this was all added just to test the axios library. Below is pulling a get request on how to pull live data back via an api call. We have to bind the getPortfolioItems function to the "this" so that it is able to be called within the render function and pulled into our app.
        this.getPortfolioItems = this.getPortfolioItems.bind(this);
    }

    portfolioItems() {
        return this.state.data.map(item => {
            return <PortfolioItem title={item.title} url={"google.com"} slug={item.slug}/>// props
        });
    }

    getPortfolioItems() {
        axios.get('https://anthonygallegos.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    }

    // using the filter function to filter over the data elements that are in the intial state we are able to group the data by its category and render/set a new state of just those items
    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }

    render() {
        if (this.state.isLoading) {
            return <div>Is Loading...</div>
        };

        this.getPortfolioItems();
        return (
            <div>
            <h1>{this.state.pageTitle}</h1>
            {/* we have to use an annoymous function when using this click handler because we have to pass an argument to our handleFilter function & if we do no pass it in as annoymous the app will attempt to run all of the functions at the same time, by doing this we tell the app to not run the functions until the button is clicked.*/}
            <button onClick={()=>this.handleFilter("eCommerce Fulfillment & Distribution")}>eCommerce</button>
            <button onClick={()=>this.handleFilter("Car Rental")}>Car Rental</button>
            {this.portfolioItems()}
            </div>
            
        )
    };
}