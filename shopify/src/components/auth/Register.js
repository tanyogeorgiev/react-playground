import React, { Component } from 'react';
import dataHelper from '../../utils/dataHelper';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import messageHelper from '../../utils/messageHelper';
import { Input, Icon } from 'react-materialize';
import Button from 'react-materialize/lib/Button';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      repeatPass: ''
    };
  }

  dataHelper = e => {
    this.setState(dataHelper(e));
  };

  register = e => {
    e.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      return messageHelper.push('error', 'Username and password are required.');
    }
    if (this.state.password !== this.state.repeatPass) {
      return messageHelper.push('error', 'Password and repeated password don`t match.');
    }

    requester
      .register({ username: this.state.username, password: this.state.password })
      .then(res => {
        if (res.error) {
          return messageHelper.push('error', `Invalid registration! ${res.error}`);
        }

        localStorage.setItem('token', res._kmd.authtoken);
        localStorage.setItem('username', res.username);
        observer.trigger(observer.events.loginUser, res.username);
        this.props.history.push('/home');
        messageHelper.push('success', 'Registrate successful!');
      });
  };

  render() {
    return (
      <form className="add-form" onSubmit={this.register.bind(this)}>
        <blockquote>
          <h2>Register</h2>
        </blockquote>
        <Input
            type="text"
            name="username"
            className="add-value"
            label="Username"
            onChange={this.dataHelper.bind(this)}
        />
        <Input
            type="password"
            name="password"
            className="add-value"
            label="Password"
            onChange={this.dataHelper.bind(this)}
        />
        <Input
            type="password"
            name="repeatPass"
            className="add-value"
            label="Repeat Password"
            onChange={this.dataHelper.bind(this)}
        />
        <Button type="submit" waves="light">
          Register
          <Icon right>send</Icon>
        </Button>
      </form>
    );
  }
}

export default Register;
