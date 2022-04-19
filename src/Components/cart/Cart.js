import React, { Component} from 'react';
import store from '../../redux/configureStore';
import './cart.css';
import CartContent from './CartContent';


class Cart extends Component {
  constructor(props){
    super(props)  
    this.state={
      cart: [],
    };
  };

  componentDidMount = () => {
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    this.setState((prevState) => ({
      ...prevState,
      cart: cart,
    }))
  }

  componentDidUpdate = () => {
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    if (cart.length === this.state.cart.length) return;
    this.setState((prevState) => ({
      ...prevState,
      cart: cart,
    }))
  }

  render() {
    if (this.state.cart.length < 1) {
      return (
        <div
          className={`cart-is-empty ${this.props.page === 'full' && 'cart-is-empty-fullscreen'}`}
        >
          Cart Empty
        </div>
      )
    }else {
      return (
        <CartContent cart={this.state.cart} page={this.props.page} />
      )
    }
  }
}

export default Cart;
