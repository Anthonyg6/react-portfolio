import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationContainer from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import PortfolioDetail from './portfolio/portfolio-detail';
import Auth from "./pages/auth";
import NoMatch from './pages/no-match';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoggedInStatus() {
    return axios.get("https://api.devcamp.space/logged_in", {withCredentials: true})
    .then(response => {
        const loggedIn = response.data.logged_in
        const loggedInStatus = this.state.loggedInStatus

        if(loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          })
        } else if(!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          })
        }
    })
  }

  componentDidMount() {
    this.checkLoggedInStatus()
  }
  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <NavigationContainer/>

            <h1>{this.state.loggedInStatus}</h1>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/About-me" component={About} />

              <Route
              path="/Auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin = {this.handleSuccessfulLogin}
                    handleUnSuccessfulLogin ={this.handleUnSuccessfulLogin}
                  />
                )}
              />

              <Route path="/Contact" component={Contact} />
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