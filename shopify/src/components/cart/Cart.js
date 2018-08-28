import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartProduct from '../partials/CartProduct';
import { Col, Icon, Button } from 'react-materialize';
import Row from 'react-materialize/lib/Row';

class BuyProduct extends Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.state.products = JSON.parse(localStorage.getItem('cart')) || [];
    this.removeProductComponent = this.removeProductComponent.bind(this);
  }
  removeProductComponent(index) {
    this.setState((prevState, prevProps) => {
      let spliced = prevState.products;
      spliced.splice(index, 1);
      return { products: spliced };
    });
  }
  render() {
    return (
      <div>
        <blockquote>
          <h2>Your cart</h2>
        </blockquote>
        {this.state !== null && this.state.products.length > 0
          ? this.state.products.map((p, i) => 
              <Row>
                <Col s={6}>
                  <CartProduct
                      key={i}
                      product={p.product}
                      count={p.count}
                      total={p.product.price * p.count}
                      removeProductComponent={this.removeProductComponent}
                      stateIndex={this.state.products.indexOf(p)}
                  />
                </Col>
              </Row>
            )
          : null}
        <Row>
          {this.state.products !== null && this.state.products.length > 0 ? 
            <Link to="/order">
              <Button type="submit" waves="light">
                Proceed to order
                <Icon right>send</Icon>
              </Button>
            </Link>
           : 
            <i>Тhere are no products in your cart.</i>
          }
        </Row>
      </div>
    );
  }
}

export default BuyProduct;
