import React, { Component} from 'react';
import './mini_cart.css';
import store from '../../redux/configureStore';

class MiniCartContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      cart: []
    };
  }

  componentDidMount = () => {
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    this.setState((prevState) => ({
      ...prevState,
      cart
    }))
  }

  componentDidUpdate = () => {
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    if (this.state.cart.length !== cart.length) {
      this.setState((prevState) => ({
        ...prevState,
        cart
      }));
    }
  }

  render() {
    return (
      <div 
        className="display-mini-cart"
      >
         <p className="header">
            <span className="title">My Bag,</span>
            <span className="count">{this.state.cart.length} items</span>
          </p>
        {this.props.children}
      </div>
    )
  }
}

export default MiniCartContainer;
