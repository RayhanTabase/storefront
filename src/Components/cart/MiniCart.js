import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../redux/configureStore';
import './mini_cart.css';
import CartProduct from './CartProduct';

class MiniCart extends Component {
  constructor(props){
    super(props)
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this); 
    this.state={
      showMiniCart: false,
      selectedCurrency: null,
      cart : [],
      cartTotal: 0
    };
  };

  addToTotal = (amount) => {
    this.setState((prevState) => ({
      ...prevState,
      cartTotal: prevState.cartTotal + amount
    }))
  }
  
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (event.target.className.includes('cartMenuBtn')) return;

      this.props.showMiniCart();
    }
  }

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);    
    const { cartReducer, currencyReducer } = store.getState();
    const { cart } = cartReducer;
    const { currencyType } = currencyReducer;
    this.setState((prevState) => ({
      ...prevState,
      cart: cart,
      selectedCurrency: currencyType,
    }))
  }

  componentDidUpdate = () => {
    const { cartReducer, currencyReducer } = store.getState();
    const { cart } = cartReducer;
    const { currencyType } = currencyReducer;
    if (this.state.cart.length !== cart.length) {
      this.setState((prevState) => ({
        ...prevState,
        cart: cart,
      }))
    }

    if (this.state.selectedCurrency !== currencyType) {
      this.setState((prevState) => ({
        ...prevState,
        selectedCurrency: currencyType,
        cartTotal: 0
      }))
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  displayCart = () => {
    return this.state.cart.map((product) => <CartProduct key={product.id} product={product} addTotal={this.addToTotal} />)
  }

  render() {
    return (
      <div 
        
        ref={this.wrapperRef}
      >
        {
          this.state.cart.length < 1 ?
            <p className="mini-cart-cart-empty">Cart Empty</p>
          :
          <>
            <p className="mini-cart-title">
              <span className="title">My Bag,</span>
              <span className="count">{this.state.cart.length} items</span>
            </p>
            <div className="mini-cart-products-content">
              {this.displayCart()}
            </div>
            <p>
              <span>Total</span>
              <span>
                {this.state.selectedCurrency && this.state.selectedCurrency.symbol}
                {this.state.cartTotal.toFixed(2)}
              </span>
            </p>
            
          </>
        }
        <NavLink
          to = {`/cart`}
          onClick={() => this.props.showMiniCart()}
        >
          Go to Bag
        </NavLink>
      </div>
    )
  }
}

export default MiniCart;
