import React, { Component} from 'react';
import store from '../../redux/configureStore';
import './mini_cart.css';

class MiniCart extends Component {
  constructor(props){
    super(props)  
    this.state={
      showMiniCart: false,
      selectedCurrency: null,
      cart : []
    };
  };

  componentDidMount = () => {
    store.subscribe(() => {
      const { cartReducer, currencyReducer } = store.getState();
      const { cart } = cartReducer;
      const { currencyType } = currencyReducer;
      this.setState((prevState) => ({
        ...prevState,
        cart: cart,
        selectedCurrency: currencyType,
      }))
    });
  }
  
  render() {
    return (
      <div className="display-mini-cart">
          empty
      </div>
    )
  }
}

export default MiniCart;
