import Loader from 'react-loader-spinner';
import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="centerAlign">
        <Loader type="Puff" color="#00BFFF" height="100" width="100" />
        <p>Loading please wait!</p>
      </div>
    );
  }
}

export default Loading;
