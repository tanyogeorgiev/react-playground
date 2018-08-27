import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import dataHelper from '../../utils/dataHelper';
import messageHelper from '../../utils/messageHelper';
import Input from 'react-materialize/lib/Input';
import Button from 'react-materialize/lib/Button';
import { Icon } from 'react-materialize';

class EditCategory extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      imageUrl: ''
    };
  }

  componentDidMount() {
    requester.getCategory(this.props.match.params.id).then(res => {
      this.setState({
        name: res.name,
        imageUrl: res.imageUrl
      });
    });
  }

  dataHelper = e => {
    this.setState(dataHelper(e));
  };

  editCategory = e => {
    e.preventDefault();
    if (this.state.name === '') {
      return messageHelper.push('error', 'Category name is required.');
    }
    requester.editCategory(this.props.match.params.id, this.state).then(res => {
      messageHelper.push('success', 'Category edited successfully!');
      this.props.history.push('/categories');
    });
  };

  render() {
    if (localStorage.username !== 'admin') {
      return <Redirect to="/home" />;
    }

    return (
      <form className="add-form" onSubmit={this.editCategory.bind(this)}>
        <blockquote>
          <h2>Edit category</h2>
        </blockquote>

        <label htmlFor="name">Name</label>
        <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.dataHelper.bind(this)}
        />
        <label htmlFor="imageUrl">Image (URL)</label>
        <Input
            type="text"
            name="imageUrl"
            className="add-value"
            value={this.state.imageUrl}
            onChange={this.dataHelper.bind(this)}
        />
        <Button type="submit" waves="light">
          Edit
          <Icon right>send</Icon>
        </Button>
      </form>
    );
  }
}

export default EditCategory;
