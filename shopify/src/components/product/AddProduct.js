import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import dataHelper from '../../utils/dataHelper';
import messageHelper from '../../utils/messageHelper';
import { Input, Icon } from 'react-materialize';
import Button from 'react-materialize/lib/Button';

class AddProduct extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      imageUrl: '',
      description: '',
      category: '',
      price: '',
      categories: []
    };
  }

  componentDidMount() {
    requester.listCategories().then(res => {
      this.setState({
        categories: res
      });
    });
  }

  dataHelper = e => {
    console.log(e.target);
    this.setState(dataHelper(e));
  };

  addProduct = e => {
    e.preventDefault();
    if (this.state.title === '' || this.state.price === '') {
      return messageHelper.push('error', 'Title and price are required.');
    }
    if (this.state.imageUrl === '') {
      return messageHelper.push('error', 'Image URL is required.');
    }
    if (this.state.category === '') {
      return messageHelper.push('error', 'Please, choose category.It is required.');
    }

    let obj = {
      title: this.state.title,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      category: this.state.category,
      price: this.state.price,
      fav: []
    };
    requester.addProduct(obj).then(res => {
      messageHelper.push('success', 'Product edited successfully!');
      this.props.history.push('/home');
    });
  };

  render() {
    if (localStorage.username !== 'admin') {
      return <Redirect to="/home" />;
    }

    return (
      <form className="add-form" onSubmit={this.addProduct.bind(this)}>
        <blockquote>
          <h2>Add product</h2>
          <p>Fill out all fields below!</p>
        </blockquote>

        <Input type="text" name="title" label="Title" onChange={this.dataHelper.bind(this)} />
        <Input type="number" name="price" label="Price" onChange={this.dataHelper.bind(this)} />
        <Input type="text" name="imageUrl" label="ImageUrl" onChange={this.dataHelper.bind(this)} />

        <Input
            type="textarea"
            name="description"
            className="materialize-textarea"
            label="Description"
            onChange={this.dataHelper.bind(this)}
        />

        <select className="browser-default" name="category" onChange={this.dataHelper.bind(this)}>
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
          ADD
          <Icon right>send</Icon>
        </Button>
      </form>
    );
  }
}

export default AddProduct;
