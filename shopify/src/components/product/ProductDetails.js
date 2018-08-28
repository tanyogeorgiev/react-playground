import React, { Component } from 'react';
import { Card, Row, Icon } from 'react-materialize';
import requester from '../../infrastructure/requester';
import Loader from '../common/Loader';
import CardTitle from 'react-materialize/lib/CardTitle';
import Col from 'react-materialize/lib/Col';
import CardPanel from 'react-materialize/lib/CardPanel';
import { Link } from 'react-router-dom';
import addProductToCart from '../../utils/product/addProduct';
import favouriteProduct from '../../utils/product/favouriteProduct';
import Button from 'react-materialize/lib/Button';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      productId: '',
      product: '',
      favBtn: ''
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        loaded: true
      });
      this.getData();
    }
  }

  getData = () => {
    requester.productDetails(this.props.match.params.id).then(product => {
      let index = product.fav.indexOf(localStorage.username);
      this.setState({
        product: product,
        productId: product._id,
        favBtn: index >= 0 ? 'favorite' : 'favorite_border',
        loaded: false
      });
    });
  };

  setContent(obj) {
    this.setState(obj);
  }

  render() {
    let product = {
      _id: this.state.product._id,
      title: this.state.product.title,
      imageUrl: this.state.product.imageUrl,
      price: this.state.product.price
    };
    if (this.state.loaded === true || this.state.loaded === undefined) {
      return (
        <div className="load">
          <Loader />
        </div>
      );
    }
    const editAndDelete = 
      <div>
        <Link to={`/deleteProduct/${this.props.match.params.id}`}>
          <Icon medium id="delete_outline">
            delete_outline
          </Icon>
        </Link>
        <Link to={`/editProduct/${this.props.match.params.id}`}>
          <Icon medium id="edit">
            edit
          </Icon>
        </Link>
      </div>
    ;

    const buy = 
      <Row>
        <Col s={4}>
          <Button onClick={() => addProductToCart(product)}>
            <Icon small id="add-icon">
              shopping_basket
            </Icon>
          </Button>
        </Col>
        <Col s={4} m={1}>
          <Button
              className="waves-effect waves-red red "
              onClick={() =>
              favouriteProduct(this.state.favBtn, this.setContent.bind(this), this.props)
            }
          >
            <Icon small>{this.state.favBtn}</Icon>
          </Button>
        </Col>
      </Row>
    ;

    return (
      <div>
        <h4 className="col s12">{this.state.product.title}</h4>
        <Row>
          <Col s={6}>
            <Card
                header={<CardTitle reveal image={this.state.product.imageUrl} waves="light" />}
                title="Click on it for product information"
                reveal={
                <p>
                  {this.state.product.description}
                  on.
                </p>
              }
                className="details"
            />
          </Col>

          <Col s={3}>
            <CardPanel>
              <p blue-text text-darken-2>
                Action panel
              </p>
              <Row>
                <Icon left medium red>
                  attach_money
                </Icon>
                <h2>{this.state.product.price}</h2>
                <hr />
                {localStorage.username === 'admin' ? editAndDelete : buy}
              </Row>
            </CardPanel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductDetails;
