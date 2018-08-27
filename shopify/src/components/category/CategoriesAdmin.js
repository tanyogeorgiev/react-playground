import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Badge, Col } from 'react-materialize';
import requester from '../../infrastructure/requester';
import AddCategory from './AddCategory';
import Collection from 'react-materialize/lib/Collection';
import CollectionItem from 'react-materialize/lib/CollectionItem';
import Row from 'react-materialize/lib/Row';

class Categories extends Component {
  constructor() {
    super();

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    requester.listCategories().then(res => {
      this.setState({ categories: res });
    });
  }

  addCategory = category => {
    this.setState(prevState => {
      let categories = prevState.categories;
      categories.splice(0, 0, category);

      return { categories };
    });
  };

  render() {
    return (
      <Row>
        <Col s={9} className="">
          <AddCategory addCategory={this.addCategory.bind(this)} />
        </Col>
        <Col s={3}>
          <blockquote>
            <h2>All categories</h2>
          </blockquote>
          <Collection>
            {this.state.categories.map((c, i) =>
              <CollectionItem>
                {c.name}
                <Badge>
                  <Link to={`/deleteCategory/${c._id}`}>
                    <Icon small id="delete_outline">
                      delete_outline
                    </Icon>
                  </Link>
                  <Link to={`/editCategory/${c._id}`}>
                    <Icon small id="edit">
                      edit
                    </Icon>
                  </Link>
                </Badge>
              </CollectionItem>
            )}
          </Collection>
        </Col>
      </Row>
    );
  }
}

export default Categories;
