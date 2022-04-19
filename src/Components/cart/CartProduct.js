import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getItem } from '../../Apollo';
import store from '../../redux/configureStore';

class CartProduct extends Component {
  constructor(props){
    super(props)  
    this.state={
      amount: 0,
    };
  };

  // componentDidUpdate = () => {
  //   this.adddToTotal();
  // }
  
  // adddToTotal = () => {
  //   const data = this.props.data;
  //   if (data.loading) return;
  //   const product = data.product;
  //   let price = product.prices[0];
  //   if (this.props.selectedCurrency !== null) {
  //     price = product.prices.find((price) => (price.currency.label === this.props.selectedCurrency.label));
  //   }
  //   if (price.currency.label === this.props.selectedCurrency.label && price.amount === this.state.amount) return;
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     amount: price.amount,
  //   }))
  //   this.props.adddToTotal(price.amount);
  // }

  displayProducts = () => {
    var data = this.props.data;
    if (data.loading) return '';
    const product = data.product
    
    // console.log(this.props);
    let price = product.prices[0];
    if (this.props.selectedCurrency) {
      price = product.prices.find((price) => (price.currency.label === this.props.selectedCurrency.label));
    }
    const brand = product.brand;
    const name = product.name;
    const imageSource = product.gallery[0];
    const attributes = product.attributes;
    const quantity = this.props.product.quantity;
    const selectedAttributes =this.props.product.attributes;
    return (
      <div className="d-flex">
        <div>
          <p>
            {brand}
          </p>
          <p>
            {name}
          </p>
          <p>
            {price.currency.symbol}
            {price.amount}
          </p>
          <div>
            attributes
          </div>
        </div>
        <div>
          change qty
        </div>
        <img src={imageSource} alt={name} />
      </div>
    )
  }

  render() {
    return (
      <>
        {this.displayProducts()}
        <hr/>
      </>
    )
  }
}

export default graphql(getItem, {
  options: (props) => {
    return {
      variables: {
        id: props.product.id
      }
    }
  }
})(CartProduct);
