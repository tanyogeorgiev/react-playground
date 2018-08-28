import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-materialize/lib/Card';
import CardTitle from 'react-materialize/lib/CardTitle';

class Category extends Component {
  render() {
    return (
      <Card
          header={<CardTitle reveal image={this.props.category.imageUrl} waves="light" />}
          title={this.props.category.name}
          reveal={<p>This is category about burgers</p>}
      >
        <Link to={`/products/${this.props.category.name}`}>View all products in this category</Link>
      </Card>
    );
  }
}

export default Category;
