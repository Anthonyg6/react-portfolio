import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationContainer from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import PortfolioDetail from './portfolio/portfolio-detail';
import NoMatch from './pages/no-match';

export default class App extends Component {
  // this was all added just to test the axios library. Below is pulling a get request on how to pull live data back via an api call. We have to bind the getPortfolioItems function to the "this" so that it is able to be called within the render function and pulled into our app.
  constructor() {
    super();

    this.getPortfolioItems = this.getPortfolioItems.bind(this);
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
  render() {
    this.getPortfolioItems();
    return (
      <div className='app'>
        <Router>
          <div>
            <h1>Anthony Gallegos React Portfolio</h1>
            <div>
              {moment().format('MMMM Do YYYY, h:mm:ss a')}
            </div>

            <NavigationContainer/>

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/Blog" component={Blog} />
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}