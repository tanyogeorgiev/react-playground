import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import Product from '../partials/Product';
import Loader from '../common/Loader';
import { Row, Col } from 'react-materialize';

class Products extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      products: []
    };
  }

  componentDidMount() {
    requester.similarProducts(this.props.match.params.category).then(res => {
      this.setState({
        products: res,
        loaded: false
      });
    });
  }

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

export default Products;
