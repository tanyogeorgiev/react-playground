import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import requester from '../../infrastructure/requester';
import Order from '../partials/Order';
import Loader from '../common/Loader';
import Row from 'react-materialize/lib/Row';
import messageHelper from '../../utils/messageHelper';

class Orders extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      orders: []
    };
  }

  componentDidMount() {
    requester.listOrders().then(res => {
      this.setState({
        orders: res,
        loaded: false
      });
    });
  }

  deleteOrder = index => {
    this.setState(prevState => {
      let orders = prevState.orders;
      orders.splice(index, 1);

      return { orders };
    }, messageHelper.push('success', 'Order was delivery to the client'));
  };

  render() {
    if (localStorage.username !== 'admin') {
      return <Redirect to="/home" />;
    }

    if (this.state.loaded === true || this.state.loaded === undefined) {
      return (
        <div className="load">
          <Loader />
        </div>
      );
    }

    return (
      <div>
        <blockquote>
          <h2>All orders</h2>
        </blockquote>
        <Row>
          {this.state.orders !== null && this.state.orders.length > 0 ? 
            this.state.orders.map((o, i) => 
              <Order key={i} order={o} deleteOrder={this.deleteOrder.bind(this)} />
            )
           : 
            <i>Тhere are no orders.</i>
          }
        </Row>
      </div>
    );
  }
}

export default Orders;
