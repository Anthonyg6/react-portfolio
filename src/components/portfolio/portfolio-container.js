import React, { Component } from 'react';
import axios from 'axios';

import PortfolioItem from './portfolio-items';

export default class PortfolioContainer extends Component {
    constructor() {
        super()

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
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        });
    }

    getPortfolioItems() {
        axios.get('https://anthonygallegos.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        // console.log("response data",response);
        this.setState({
            data: response.data.portfolio_items
        });
      })
      .catch(error => {
        console.log(error);
      });
    }

    portfolioItems() {
        return this.state.data.map(item => {
            // console.log("PortfolioItem", item) this syntax allows you to output the data in the console log in the browser so we are able to see what kind of data we have access too that is coming in from an API, this is used if we don't know the type of data that is getting pulled in.
            return <PortfolioItem key={item.id} item={item}/>// props
        });
    }

    componentDidMount() {
        this.getPortfolioItems();
    };

    render() {
        if (this.state.isLoading) {
            return <div>Is Loading...</div>
        };

        return (
            /* we have to use an annoymous function when using this click handler because we have to pass an argument to our handleFilter function & if we do no pass it in as annoymous the app will attempt to run all of the functions at the same time, by doing this we tell the app to not run the functions until the button is clicked.*/
            <div className="portfolio-items-wrapper">
                <button className="btn" onClick={()=>this.handleFilter("Social Media")}>Social Media</button>
                <button className="btn" onClick={()=>this.handleFilter("Automotive")}>Car Rental</button>
                <button className="btn" onClick={()=>this.handleFilter("Search Engine")}>Search Engine</button>
                {this.portfolioItems()}
            </div>
            
        )
    };
}