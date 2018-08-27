import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';
class NotFount extends Component {
  render() {
    return (
      <div>
        <h3>Error 404 Page not found</h3>
        <Link to="/home">
          <Button>Go to home page</Button>
        </Link>
      </div>
    );
  }
}

export default NotFount;
