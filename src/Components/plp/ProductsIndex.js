import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getProducts } from '../../Apollo';
import store from '../../redux/configureStore';
import ProductCard from './ProductCard';

class ProductsIndex extends Component {
  constructor(props){
    super(props)  
    this.state={
      products: [],
      pagProducts: [],
      selectedCurrency: null,
      pageNumber: 1,
      cart: []
    };
  };

  loadProducts = () => {
    var data = this.props.data;
    if (data.loading) return;
    if (data.category.products.length === this.state.products.length) return;
    this.setState((prevState) => ({
      ...prevState,
      products: data.category.products,
    }))
  }

  displayProducts = () => {
    if (this.state.products.length < 1) {
      return (
        <div>Loading</div>
      )
    };
    const pagProducts = this.state.products.slice((this.state.pageNumber - 1) * 6, this.state.pageNumber * 6);
    return pagProducts.map((product) => {
      const productInCart = this.state.cart.find((cartProduct) => cartProduct.id === product.id )
      const isInCart = productInCart === undefined ? false : true;
      return (
        <ProductCard
          key={product.id}
          product={product}
          selectedCurrency={this.state.selectedCurrency}
          isInCart={isInCart}
        />
      )
    });
  }

  componentDidUpdate = () => {
    this.loadProducts();
  }

  componentDidMount = () => {
    store.subscribe(() => {
      const { currencyReducer, cartReducer } = store.getState();
      const { currencyType } = currencyReducer;
      const { cart } = cartReducer;
      this.setState((prevState) => ({
        ...prevState,
        selectedCurrency: currencyType,
        cart:cart
      }))
    });
  }

  render() {
    return (
      <div className="category-products">
        { this.displayProducts() }
      </div>
    )
  }
}

export default graphql(getProducts, {
  options: (props) => {
    return {
      variables: {
        title: props.categoryName
      }
    }
  }
})(ProductsIndex);
