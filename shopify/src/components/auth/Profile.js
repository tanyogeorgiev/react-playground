import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import Loader from '../common/Loader';
import Product from '../partials/Product';
import { Row } from 'react-materialize';
import Col from 'react-materialize/lib/Col';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favsProducts: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = token => {
    requester.favsProducts(localStorage.username).then(favsProducts => {
      console.log('profile favs product: ' + JSON.stringify(favsProducts));
      this.setState({
        favsProducts: favsProducts,
        loaded: false
      });
    });
  };

  render() {
    if (this.state.loaded === true || this.state.loaded === undefined) {
      return (
        <div className="load">
          <Loader />
        </div>
      );
    }

    return (
      <Row>
        <h2>Your favourties products:</h2>

        {this.state.favsProducts.length > 0 ? 
          this.state.favsProducts.map((p, i) => 
            <Col s={3}>
              <Product key={i} product={p} />
            </Col>
          )
         : 
          <i>Тhere are any favourites products! </i>
        }
      </Row>
    );
  }
}

export default Profile;
