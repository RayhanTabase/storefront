import React, { Component} from 'react';
import store from '../../redux/configureStore';
import { show_minicart } from '../../redux/navigation/actions';
import emptyCart from '../../assets/empty_cart.svg';
import Cart from './Cart';
import './mini_cart.css';
import MiniCartContainer from './MiniCartContainer';



class CartButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      showMiniCart: false
    }
  };

  componentDidMount = () => {
    const { navigationReducer } = store.getState();
    const { showMiniCart } = navigationReducer;
    this.setState((prevState) => ({
      ...prevState,
      showMiniCart: showMiniCart,
    }))
  }

  componentDidUpdate = () => {
    const { navigationReducer } = store.getState();
    const { showMiniCart } = navigationReducer;
    if (this.state.showMiniCart !== showMiniCart) {
      this.setState((prevState) => ({
        ...prevState,
        showMiniCart: showMiniCart,
      }))
    }
  }

  showMiniCart = () => {
    store.dispatch(show_minicart());
  }

  render() {
    return (
      <>
        <button
          type="button"
          className="btn-colorless cartMenuBtn"
          onClick={this.showMiniCart}
          >
          <img className="cartMenuBtn" src={emptyCart} alt="empty cart"/>
        </button>
        {
          this.state.showMiniCart &&
          <MiniCartContainer>
            <Cart page={'mini'} />
          </MiniCartContainer>
        }
      </>
    )
  }
}

export default CartButton;