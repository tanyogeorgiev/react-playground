import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import messageHelper from '../../utils/messageHelper';
import Card from 'react-materialize/lib/Card';
import Button from 'react-materialize/lib/Button';
import { Row, Col } from 'react-materialize';

class DeleteCategory extends Component {
  constructor() {
    super();

    this.state = {
      products: 0
    };
  }

  deleteCategory = e => {
    e.preventDefault();
    requester.deleteCategory(this.props.match.params.id).then(res => {
      messageHelper.push('success', 'Category deleted successfully!');
      this.props.history.push('/categories');
    });
  };

  render() {
    if (localStorage.username !== 'admin') {
      return <Redirect to="/home" />;
    }

    return (
      <Card
          className="teal"
          textClassName="white-text"
          title="Attention!"
          actions={[
          <Row>
            <Col s={3}>
              <Button className="red" onClick={this.deleteOrder}>
                Yes
              </Button>
            </Col>{' '}
            <Col s={3}>
              <Link to="/categories">
                <Button className=" ">No</Button>
              </Link>
            </Col>
          </Row>
        ]}
      >
        Are you sure you want to delete this category, maybe products related to it?
      </Card>
    );
  }
}

export default DeleteCategory;
