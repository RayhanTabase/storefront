import React, { Component} from 'react';
import emptyCart from '../../assets/empty_cart.svg';
import MiniCart from './MiniCart';

class CartButton extends Component {
  constructor(props){
    super(props)
    this.state={
      showMiniCart: false
    };
  };

  showMiniCart = () => {
    this.setState((prevState) => ({
      ...prevState,
      showMiniCart: !prevState.showMiniCart
    }))
  }
  
  render() {
    return (
      <>
        <button
          type="button"
          className="btn-colorless"
          onClick={this.showMiniCart}
          >
          <img src={emptyCart} alt="empty cart" className=""/>
        </button>
        {
          this.state.showMiniCart &&
          <MiniCart showMiniCart={this.showMiniCart} />
        }
      </>
    )
  }
}

export default CartButton;