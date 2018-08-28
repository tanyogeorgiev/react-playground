import React, { Component } from 'react';
import removeProductFromCart from '../../utils/product/removeProduct';
import Collapsible from 'react-materialize/lib/Collapsible';
import { CollapsibleItem, Row, Card, Button } from 'react-materialize';
import Col from 'react-materialize/lib/Col';
import CardTitle from 'react-materialize/lib/CardTitle';
import Icon from 'react-materialize/lib/Icon';

class CartProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: this.props.count,
      total: this.props.total
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.product._id !== prevProps.product._id) {
      this.setState({
        count: this.props.count,
        total: this.props.total
      });
    }
  }

  removeComponentOrNot(count) {
    if (this.state.count < 1) {
      this.props.removeProductComponent(this.props.stateIndex);
    }
  }

  deleteProduct = () => {
    removeProductFromCart(this.props.product);

    this.setState(
      prevState => ({
        count: prevState.count - 1,
        total: (prevState.count - 1) * this.props.product.price
      }),
      this.removeComponentOrNot
    );
  };

  render() {
    return (
      <div>
        <Collapsible popout defaultActiveKey={1}>
          <CollapsibleItem
              header={this.props.product.title + ' - ' + this.state.count + 'qty'}
              icon="whatshot"
          >
            <Row>
              <Col>
                <Card
                    horizontal
                    header={<CardTitle image={this.props.product.imageUrl} />}
                    actions={[
                    <Button className="waves-effect waves-teal red" onClick={this.deleteProduct}>
                      <Icon left medium>
                        remove_shopping_cart
                      </Icon>
                    </Button>
                  ]}
                >
                  <h5>Count: {this.state.count}</h5>
                  <h5>
                    Price:
                    <Icon tiny>attach_money</Icon>
                    {this.props.product.price}
                  </h5>
                  <h5>
                    Total:
                    <Icon tiny>attach_money</Icon>
                    {this.state.total}
                  </h5>
                </Card>
              </Col>
            </Row>
          </CollapsibleItem>
        </Collapsible>
      </div>
    );
  }
}

export default CartProduct;
