import React, { Component } from 'react';

import requester from '../../infrastructure/requester';
import Col from 'react-materialize/lib/Col';
import { Card, Button, Row } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';

class Order extends Component {
  deleteOrder = () => {
    requester.deleteOrder(this.props.order._id).then(res => {
      this.props.deleteOrder(this.props.order.key);
    });
  };

  render() {
    return (
      <Col s={6}>
        <h4 className="  teal-text  ">{'Order -' + this.props.order._id}</h4>
        <Card
            className="teal lighten-5"
            actions={[
            <Button id="btn-delete-cart-product" onClick={this.deleteOrder}>
              All set!
            </Button>
          ]}
        >
          <Row>
            <h6>
              <Icon small left>
                account_box
              </Icon>{' '}
              {this.props.order.firstName} {this.props.order.lastName}
            </h6>
          </Row>
          <Row>
            <h6>
              <Icon small left>
                contact_phone
              </Icon>{' '}
              {this.props.order.phone}
            </h6>
          </Row>
          <Row>
            <h6>
              <Icon small left>
                add_location
              </Icon>{' '}
              {this.props.order.address}
            </h6>
          </Row>
          <Row>
            <h6>
              <Icon small left>
                access_time
              </Icon>{' '}
              {this.props.order._kmd.ect}
            </h6>
          </Row>
          <Row>
            <h6>
              {' '}
              <Icon small left>
                insert_comment
              </Icon>{' '}
              {this.props.order.additionalInfo}
            </h6>
          </Row>
          <Row>
            <h6>
              <Icon small left>
                store{' '}
              </Icon>{' '}
            </h6>

            {this.props.order.products.map((p, i) => 
              <p key={i}>
                <Icon tiny left>
                  shopping_basket
                </Icon>{' '}
                #{i + 1} {p.product._id} - {p.product.title} - {p.count} count
              </p>
            )}
          </Row>
          <h6>
            Total Order Value: <Icon tiny>attach_money</Icon>
            {this.props.order.total}
          </h6>
        </Card>
      </Col>
    );
  }
}

export default Order;
