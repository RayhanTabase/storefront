import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import inCart from '../../assets/in_cart.svg';
import store from '../../redux/configureStore';
import { change_product } from '../../redux/navigation/actions';


class ProductCard extends Component {
  
  changeProductPage = () =>{
    store.dispatch(change_product(this.props.product.id));
  }

  displayProduct = () =>{
    const name = this.props.product.name;
    const prices = this.props.product.prices;
    let price = prices[0];
    if (this.props.selectedCurrency) {
      price = prices.find((price) => (price.currency.label === this.props.selectedCurrency.label));
    }
    const imageSource = this.props.product.gallery[0];
    return (
        <div className={`product-card  ${!this.props.product.inStock && 'fade-content'} ${this.props.isInCart && 'card-shadow'}`}>
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
      <NavLink
        to = {`/description/`}
        onClick={this.changeProductPage}
      >
        {this.displayProduct()}
      </NavLink>
      
    )
  }
}

export default ProductCard;
