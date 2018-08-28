import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Badge, Button } from 'react-materialize';
import addProductToCart from '../../utils/product/addProduct';
import Card from 'react-materialize/lib/Card';
import CardTitle from 'react-materialize/lib/CardTitle';
import ToLocalDateTime from '../../utils/dateToLocaleTimeHelper';

class Product extends Component {
  render() {
    console.log(this.props.product);
    let product = {
      _id: this.props.product._id,
      title: this.props.product.title,
      imageUrl: this.props.product.imageUrl,
      price: this.props.product.price
    };

    const editAndDelete =
      <div>
        <Link to={`/deleteProduct/${this.props.product._id}`}>
          <Icon small id="delete_outline">
            delete_outline
          </Icon>
        </Link>
        <Link to={`/editProduct/${this.props.product._id}`}>
          <Icon small id="edit">
            edit
          </Icon>
        </Link>
      </div>
    ;

    const buy =
      <Button onClick={() => addProductToCart(product)}>
        <Icon small id="add-icon">
          shopping_basket
        </Icon>
      </Button>
    ;

    return (
      <Card
          header={<CardTitle reveal image={this.props.product.imageUrl} waves="light" />}
          title={
          <p>
            {this.props.product.title} <Badge>$ {this.props.product.price}</Badge>
          </p>
        }
          reveal={
          <p>
            This product is add to our catalog on: {ToLocalDateTime(this.props.product._kmd.ect)}
          </p>
        }
          actions={localStorage.username === 'admin' ? editAndDelete : buy}
      >
        <Link to={`/product/${this.props.product._id}`}>View details..</Link>
      </Card>
    );
  }
}

export default Product;
