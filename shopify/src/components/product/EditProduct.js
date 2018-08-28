import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import dataHelper from '../../utils/dataHelper';
import messageHelper from '../../utils/messageHelper';
import Input from 'react-materialize/lib/Input';
import { Button, Icon } from 'react-materialize';

class EditProduct extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      imageUrl: '',
      description: '',
      category: '',
      categories: [],
      price: ''
    };
  }

  componentDidMount() {
    requester.productDetails(this.props.match.params.id).then(res => {
      this.setState({
        title: res.title,
        imageUrl: res.imageUrl,
        description: res.description,
        category: res.category,
        price: res.price
      });
    });
    requester.listCategories().then(res => {
      this.setState({
        categories: res
      });
    });
  }

  dataHelper = e => {
    this.setState(dataHelper(e));
  };

  editProduct = e => {
    e.preventDefault();
    if (this.state.title === '' || this.state.price === '' || this.state.imageUrl === '') {
      return messageHelper.push('error', 'Title, image and price are required.');
    }
    requester.editProduct(this.props.match.params.id, this.state).then(res => {
      messageHelper.push('success', 'Product edited successfully!');
      this.props.history.push('/');
    });
  };

  render() {
    if (localStorage.username !== 'admin') {
      return <Redirect to="/home" />;
    }

    return (
      <form className="add-form" onSubmit={this.editProduct.bind(this)}>
        <blockquote>
          <h2>Edit product</h2>
        </blockquote>
        <label htmlFor="title">Title</label>
        <Input
            type="text"
            className="active"
            value={this.state.title}
            name="title"
            onChange={this.dataHelper.bind(this)}
        />
        <label htmlFor="title">Price</label>
        <Input
            type="number"
            value={this.state.price}
            name="price"
            onChange={this.dataHelper.bind(this)}
        />
        <label htmlFor="title">Image Url</label>
        <Input
            type="text"
            value={this.state.imageUrl}
            name="imageUrl"
            onChange={this.dataHelper.bind(this)}
        />
        <label htmlFor="title">Description</label>
        <Input
            type="textarea"
            value={this.state.description}
            name="description"
            className="materialize-textarea active"
            onChange={this.dataHelper.bind(this)}
        />
        <label htmlFor="title">Category</label>
        <select
            className="browser-default"
            value={this.state.category}
            name="category"
            onChange={this.dataHelper.bind(this)}
        >
          <option value="" disabled selected>
            Category
          </option>
          {this.state.categories.map((c, i) => 
            <option name="category" key={i} value={c.name}>
              {c.name}
            </option>
          )}
        </select>
        <Button type="submit" waves="light">
          Change
          <Icon right>send</Icon>
        </Button>
      </form>
    );
  }
}

export default EditProduct;
