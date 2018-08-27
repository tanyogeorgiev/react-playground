import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import Product from '../partials/Product';
import Loader from '../common/Loader';

import { Redirect } from 'react-router-dom';
import Row from 'react-materialize/lib/Row';
import { Col } from 'react-materialize';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      products: []
    };
  }

  componentDidMount() {
    if (localStorage.username === undefined) {
      requester.login({ username: 'guest', password: '123' }).then(res => {
        localStorage.setItem('token', res._kmd.authtoken);
        localStorage.setItem('username', res.username);
        this.getData(res._kmd.authtoken);
      });
      return <Redirect to="/home" />;
    } else {
      this.getData(localStorage.token);
    }
  }

  getData = token => {
    requester.listProducts(token).then(res => {
      this.setState({
        products: res,
        loaded: false
      });
    });
  };

  render() {
    if (this.state.loaded === true || this.state.loaded === undefined) {
      return <Loader />;
    }

    return (
      <Row>
        {this.state.products.map((p, i) => 
          <Col s={3}>
            <Product key={i} product={p} />
          </Col>
        )}
      </Row>
    );
  }
}

export default Home;
