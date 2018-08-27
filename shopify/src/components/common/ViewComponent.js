import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Register from '../auth/Register';
import Login from '../auth/Login';
import AddProduct from '../product/AddProduct';
import ProductDetails from '../product/ProductDetails';
import EditProduct from '../product/EditProduct';
import DeleteProduct from '../product/DeleteProduct';
import Cart from '../cart/Cart';
import OrderForm from '../orders/OrderForm';
import Orders from '../orders/Orders';
import CategoriesAdmin from '../category/CategoriesAdmin';
import DeleteCategory from '../category/DeleteCategory';
import EditCategory from '../category/EditCategory';
import Categories from '../category/Categories';
import Products from '../product/Products';
import Profile from '../auth/Profile';
import NotFound from '../common/NotFound';

class ViewComponent extends Component {
  render() {
    return (
      <Switch className="content">
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/addProduct" component={AddProduct} />
        <Route path="/editProduct/:id" component={EditProduct} />
        <Route path="/deleteProduct/:id" component={DeleteProduct} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/order" component={OrderForm} />
        <Route path="/orders" component={Orders} />
        <Route path="/addCategory" component={CategoriesAdmin} />
        <Route path="/deleteCategory/:id" component={DeleteCategory} />
        <Route path="/editCategory/:id" component={EditCategory} />
        <Route path="/categories" component={Categories} />
        <Route path="/products/:category" component={Products} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default ViewComponent;
