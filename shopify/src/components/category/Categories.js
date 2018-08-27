import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import Category from '../partials/Category';
import Loader from '../common/Loader';
import { Row } from 'react-materialize';
import Col from 'react-materialize/lib/Col';

class Categories extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      categories: []
    };
  }

  componentDidMount() {
    requester.listCategories().then(res => {
      this.setState({
        categories: res,
        loaded: false
      });
    });
  }

  render() {
    if (this.state.loaded === true || this.state.loaded === undefined) {
      return <Loader />;
    }
    console.log(this.state);
    return (
      <Row>
        {this.state.categories.map((c, i) => 
          <Col s={3}>
            <Category key={i} category={c} />
          </Col>
        )}
      </Row>
    );
  }
}

export default Categories;
