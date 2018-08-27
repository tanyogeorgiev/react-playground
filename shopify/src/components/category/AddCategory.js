import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import dataHelper from '../../utils/dataHelper';
import messageHelper from '../../utils/messageHelper';
import { Input, Button } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import Row from 'react-materialize/lib/Row';

class AddCategory extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      imageUrl: ''
    };
  }

  dataHelper = e => {
    this.setState(dataHelper(e));
  };

  addCategory = e => {
    e.preventDefault();
    if (this.state.name === '') {
      return messageHelper.push('error', 'Name of category is required.');
    }
    requester.addCategory(this.state).then(res => {
      this.setState({
        name: '',
        imageUrl: ''
      });
      this.props.addCategory(res);
      messageHelper.push('success', 'Category added successfully!');
    });
  };

  render() {
    if (localStorage.username !== 'admin') {
      return <Redirect to="/home" />;
    }

    return (
      <form onSubmit={this.addCategory.bind(this)}>
        <blockquote>
          <h2>Add category</h2>
        </blockquote>
        <Row>
          <Input
              type="text"
              name="name"
              value={this.state.name}
              label="Name"
              onChange={this.dataHelper.bind(this)}
          />
        </Row>
        <Row>
          <Input
              type="text"
              name="imageUrl"
              className="add-value"
              value={this.state.imageUrl}
              label="Image (URL)"
              onChange={this.dataHelper.bind(this)}
          />
        </Row>
        <Button type="submit" waves="light">
          ADD
          <Icon right>send</Icon>
        </Button>
      </form>
    );
  }
}

export default AddCategory;
