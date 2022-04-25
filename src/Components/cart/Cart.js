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
  }

  componentDidMount = () => {
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    this.setState((prevState) => ({
      ...prevState,
      cart
    }));
  }

  componentDidUpdate = () => {
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    if (JSON.stringify(cart) === JSON.stringify(this.state.cart)) return;
    this.setState((prevState) => ({
      ...prevState,
      cart,
    }));
  }

  render() {
    const { cart } = this.state;
    const { page } = this.props;

    if (cart.length < 1) {
      return (
        <div
          className={`cart-is-empty ${page === 'full' && 'cart-is-empty-fullscreen'}`}
        >
          Cart Empty
        </div>
      )
    }else {
      return (
        <CartContent cart={cart} page={page} />
      )
    }
  }
}

export default Cart;
