import React, { Component } from 'react';
import './App.css';
import observer from './infrastructure/observer';
import Header from './components/common/Header';

import Notification from './components/common/Notification';
import ViewComponent from './components/common/ViewComponent';
import { Footer } from 'react-materialize';

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: localStorage.getItem('username'),
      index: 0
    };

    observer.subscribe(observer.events.loginUser, this.userLoggedIn);
    observer.subscribe(observer.events.logoutUser, this.userLogout);
  }

  componentDidMount = () => {};

  userLoggedIn = username => this.setState({ username });
  userLogout = data => this.setState({ username: data });

  render() {
    return (
      <div>
        <div>
          <Header username={this.state.username} />
        </div>
        <div className="container">
          <ViewComponent />
        </div>
        <Notification />
        <Footer copyrights="©2018 Shopify - your fav place" />
      </div>
    );
  }
}

export default App;
