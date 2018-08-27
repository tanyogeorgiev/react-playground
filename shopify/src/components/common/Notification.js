import React, { Component } from 'react';
import observer from '../../infrastructure/observer';
import { Toast } from 'react-materialize';

const defaultState = {
  message: null,
  success: null,
  error: null,
  loading: null
};

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.pushNotification = false;
    observer.subscribe(observer.events.notification, this.showNotification);
  }
  pushNotification;
  showNotification = data => {
    let message = data.message;
    let type = data.type;
    this.pushNotification = true;
    this.setState({ [type]: type, message: message });
  };
  render() {
    if (this.pushNotification) {
      window.Materialize.toast(this.state.message, 2000);
      this.pushNotification = false;
    }
    return <Toast toast={this.state.message ? this.state.message : ''}>Show last notify </Toast>;
  }
}

export default Notification;
