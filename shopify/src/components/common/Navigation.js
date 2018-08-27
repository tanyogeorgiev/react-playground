import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'react-materialize';
import logout from '../auth/Logout';
import NavItem from 'react-materialize/lib/NavItem';
import Dropdown from 'react-materialize/lib/Dropdown';
class Navigation extends Component {
  render() {
    const welcomeSection = 
      <NavItem>
        <NavItem>
          <NavLink activeClassName="selected" className="nav-link" to="/profile">
            [{this.props.username}]
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink activeClassName="selected" className="nav-link" onClick={logout} to="/home">
            Logout
          </NavLink>
        </NavItem>
      </NavItem>
    ;

    const authSection = 
      <NavItem>
        <NavItem>
          <NavLink to="/register">Register</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login">Login</NavLink>
        </NavItem>
      </NavItem>
    ;

    const adminSection = 
      <Dropdown
          className="teal"
          trigger={
          <NavItem>
            <span className="dropdown-trigger white-text" data-target="dropdown1">
              Admin Area
              <i className="material-icons right">arrow_drop_down</i>
            </span>
          </NavItem>
        }
      >
        <NavItem>
          <NavLink className="nav-link" to="/addProduct">
            Products
          </NavLink>
        </NavItem>
        <NavItem divider />
        <NavItem>
          <NavLink className="nav-link" exact to="/addCategory">
            Categories
          </NavLink>
        </NavItem>
        <NavItem divider />
        <NavItem>
          <NavLink to="/orders">Orders</NavLink>
        </NavItem>
      </Dropdown>
    ;

    return (
      <div>
        <NavItem>
          <NavLink activeClassName="active" className="nav-link" exact to="/home">
            Products
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink activeClassName="selected" className="nav-link" exact to="/categories">
            Categories
          </NavLink>
        </NavItem>
        {this.props.username === 'admin' ? adminSection : null}

        {this.props.username !== null && this.props.username !== 'guest'
          ? welcomeSection
          : authSection}
        {this.props.username === 'admin' ? null : 
          <NavItem>
            <NavLink to="/cart">
              <Icon medium>shopping_cart</Icon>
            </NavLink>
          </NavItem>
        }
      </div>
    );
  }
}

export default Navigation;
