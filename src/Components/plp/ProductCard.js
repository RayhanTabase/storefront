import React, { Component} from 'react';
import inCart from '../../assets/in_cart.svg';


class ProductCard extends Component {
  constructor(props){
    super(props)  
    this.state={
    };
  };

  displayProduct = () =>{
    const name = this.props.product.name
    const prices = this.props.product.prices
    const price = prices.find((price) => (price.currency.label === this.props.selectedCurrency.label));
    const imageSource = this.props.product.gallery[0];
    return (
      <div className={`${!this.props.product.inStock && 'fade-content'}`}>
        {
          !this.props.product.inStock && 
          <div className="product-outOfStock"> 
            <p>
              out of stock
            </p>
          </div>
        }
        {
          this.props.isInCart && 
          <div className="product-inCart">
            <img src={inCart} alt="cart"/>
          </div>
        }
        <img src={imageSource} alt={name} className="product-image" />
        <p className="product-name">
          {name}
        </p>
        <p className="product-price d-flex">
          <span>
            {price.currency.symbol}
          </span>
          <span>
            {price.amount}
          </span>
        </p>
      </div>
    )
  }

  render() {
    return (
      <div className="product-card">
        {this.displayProduct()}
      </div>
    )
  }
}

export default ProductCard;
