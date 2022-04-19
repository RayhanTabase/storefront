import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../redux/configureStore';
import CartProduct from './CartProduct';
import MiniCartContainer from './MiniCartContainer';

class CartPage extends Component {
  constructor(props){
    super(props)  
    this.state={
      selectedCurrency: null,
      cart : [],
      cartTotal: 0
    };
  };

  componentDidMount = () => {
    const { currencyReducer } = store.getState();
    const { currencyType } = currencyReducer;
    this.setState((prevState) => ({
      ...prevState,
      selectedCurrency: currencyType,
    }))
  }

  componentDidUpdate = () => {
    const { currencyReducer } = store.getState();
    const { currencyType } = currencyReducer;
    if (this.state.selectedCurrency !== currencyType) {
      this.setState((prevState) => ({
        ...prevState,
        selectedCurrency: currencyType,
        cartTotal: 0
      }))
    }
  }


  displayCartProducts = () => {
    return this.props.cart.map((product) => 
      <CartProduct
        key={product.id}
        product={product}
        addToTotal={this.addToTotal}
        selectedCurrency={this.state.selectedCurrency}
      />
    )
  }

  addToTotal = (amount) => {
    this.setState((prevState) => ({
      ...prevState,
      cartTotal: prevState.cartTotal + amount
    }))
  }

 
  render() {
    return (
      <>
        {
          this.props.page === 'mini' ?
          <MiniCartContainer>
            {this.displayCartProducts()}
          </MiniCartContainer>
          :
          <div className="cart-page-full">
            <h2 className="page-header2">
              Cart
            </h2>
            <hr/>
            {this.displayCartProducts()}
          </div>
        }
      </>
    )
  }
}

export default CartPage;
