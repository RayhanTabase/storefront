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
      selectedCurrency: null,
      pageNumber: 1,
      cart: []
    };
  };

  displayProducts = () => {
    var data = this.props.data;
    if (data.loading) return;
    console.log(data, this.props.categoryName);
    if (!data.category) return;
    const products = data.category.products;
    const pagProducts = products.slice((this.state.pageNumber - 1) * 6, this.state.pageNumber * 6);
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
