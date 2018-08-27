import React, { Component } from 'react';
import dataHelper from '../../utils/dataHelper';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import messageHelper from '../../utils/messageHelper';
import Input from 'react-materialize/lib/Input';
import Row from 'react-materialize/lib/Row';
import { Button } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  dataHelper = e => {
    this.setState(dataHelper(e));
  };

  login = e => {
    e.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      console.log('empty state: ' + JSON.stringify(this.state));
      console.log(this.state.username);
      return messageHelper.push('error', 'Username and password are required.');
    }

    requester.login({ username: this.state.username, password: this.state.password }).then(res => {
      if (res.error) {
        console.log(res);
        return messageHelper.push('error', `Warning! ${res.description}`);
      }

      localStorage.setItem('token', res._kmd.authtoken);
      localStorage.setItem('username', res.username);
      observer.trigger(observer.events.loginUser, res.username);
      messageHelper.push('success', 'Login successful!');

      this.props.history.push('/home');
    });
  };

  render() {
    return (
      <form onSubmit={this.login.bind(this)} className="add-form">
        <blockquote>
          <h2>Log in</h2>.
        </blockquote>
        <Row>
          <Input s={6} label="Username" name="username" onChange={this.dataHelper.bind(this)} />
          <Input
              type="password"
              label="password"
              name="password"
              s={6}
              onChange={this.dataHelper.bind(this)}
          />
          <Button type="submit" waves="light">
            Submit
            <Icon right>send</Icon>
          </Button>
        </Row>
      </form>
    );
  }
}

export default Login;
