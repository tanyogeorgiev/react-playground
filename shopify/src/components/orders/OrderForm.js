import React, { Component } from 'react';
import dataHelper from '../../utils/dataHelper';
import requester from '../../infrastructure/requester';
import messageHelper from '../../utils/messageHelper';
import { Input, Button, Icon, Row } from 'react-materialize';
import Col from 'react-materialize/lib/Col';

class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: JSON.parse(localStorage.getItem('cart')),
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      additionalInfo: '',
      total: ''
    };
  }

  dataHelper = e => {
    this.setState(dataHelper(e));
    this.setState({
      total: this.calculateTotalSum()
    });
  };

  order = e => {
    e.preventDefault();
    if (this.state.firstName === '' || this.state.lastName === '') {
      return messageHelper.push('error', 'First name and last name are required.');
    }
    if (this.state.address === '') {
      return messageHelper.push('error', 'Address is requiered.');
    }
    if (this.state.phone === '') {
      return messageHelper.push('error', 'Phone is requiered.');
    }

    requester.addOrder(this.state).then(res => {
      localStorage.setItem('cart', JSON.stringify([]));
      messageHelper.push('success', 'Order successful!');
      this.props.history.push('/home');
    });
  };

  calculateTotalSum = () => {
    let total = 0;
    let products = this.state.products;

    for (let i = 0; i < products.length; i++) {
      total += products[i].product.price * products[i].count;
    }
    return total;
  };

  render() {
    return (
      <form className="add-form" onSubmit={this.order.bind(this)}>
        <blockquote>
          <h2>Check out...</h2>

          <Row>
            <Col>
              <h5>
                Total Order Value: <Icon>attach_money</Icon>
                {this.calculateTotalSum()}
              </h5>
            </Col>
          </Row>
        </blockquote>
        <Input
            type="text"
            name="firstName"
            label="First Name"
            onChange={this.dataHelper.bind(this)}
        />
        <Input
            type="text"
            name="lastName"
            label="Last Name"
            onChange={this.dataHelper.bind(this)}
        />
        <Input type="text" name="address" label="Аddress" onChange={this.dataHelper.bind(this)} />
        <Input type="text" name="phone" label="Phone" onChange={this.dataHelper.bind(this)} />
        <Input
            type="textarea"
            name="additionalInfo"
            label="Additional information"
            onChange={this.dataHelper.bind(this)}
        />
        <br />

        <Button type="submit" waves="light">
          Proceed
          <Icon right>send</Icon>
        </Button>
      </form>
    );
  }
}

export default OrderForm;
