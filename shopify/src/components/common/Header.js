import React, { Component } from 'react';
import Navigation from '../common/Navigation';
import { Navbar } from 'react-materialize';

class Header extends Component {
  render() {
    return (
      <Navbar brand="Shopify" right>
        <Navigation username={this.props.username} />
      </Navbar>
    );
  }
}

export default Header;
