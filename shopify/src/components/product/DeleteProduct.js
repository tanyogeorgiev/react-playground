import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import messageHelper from '../../utils/messageHelper';
import Col from 'react-materialize/lib/Col';
import Card from 'react-materialize/lib/Card';
import { Button } from 'react-materialize';
import Row from 'react-materialize/lib/Row';

class DeleteProduct extends Component {
  deleteProduct = e => {
    e.preventDefault();
    requester.deleteProduct(this.props.match.params.id).then(res => {
      messageHelper.push('success', 'Product deleted successfully!');
      this.props.history.push('/');
    });
  };

  render() {
    if (localStorage.username !== 'admin') {
      return <Redirect to="/home" />;
    }

    return (
      <Row>
        <blockquote>
          <h2>Delete product</h2>
        </blockquote>
        <Col m={6} s={6}>
          <Card
              className="deep-orange darken-3"
              textClassName="white-text"
              title="Hey!"
              actions={
              <div>
                <Col s={4}>
                  <Link to="/home" className="align-center white-text">
                    No
                  </Link>{' '}
                </Col>
                <Button className=" cyan darken-1" onClick={this.deleteProduct}>
                  Yes
                </Button>
              </div>
            }
          >
            Are you sure you want to delete this product?
          </Card>
        </Col>
      </Row>
    );
  }
}

export default DeleteProduct;
