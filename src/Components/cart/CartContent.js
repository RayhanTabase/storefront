import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../redux/configureStore';
import { show_minicart } from '../../redux/navigation/actions';
import CartProduct from './CartProduct';

class CartPage extends Component {
  constructor(props){
    super(props)  
    this.state={
      selectedCurrency: null,
      recordedAmounts: {},
    };
  };

  addToTotal = (id, value) => {
    this.setState((prevState) => ({
      ...prevState,
      recordedAmounts : {
        ...prevState.recordedAmounts,
        [id] : value,
      }
    }));
  }

  removeFromCart = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      recordedAmounts : {
        ...prevState.recordedAmounts,
        [id] : 0,
      }
    }));
  }

  getToTalCart = () => {
    const total = Object.values(this.state.recordedAmounts).reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
    return total.toFixed(2);
  }

  componentDidMount = () => {
    store.subscribe(() => {
      const { currencyReducer } = store.getState();
      const { currencyType } = currencyReducer;
      this.setState((prevState) => ({
        ...prevState,
        selectedCurrency: currencyType,
      }))
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { currencyReducer } = store.getState();
    const { currencyType } = currencyReducer;
    if (JSON.stringify(prevState.selectedCurrency) === JSON.stringify(currencyType)) return;
    this.setState((prevState) => ({
      ...prevState,
      selectedCurrency: currencyType,
    }))
  }

  displayCartProducts = () => {
    return this.props.cart.map((product) => 
      <CartProduct
        key={`${product.id} ${JSON.stringify(product)}`}
        product={product}
        selectedCurrency={this.state.selectedCurrency}
        addToTotal={this.addToTotal}
        removeFromCart={this.removeFromCart}
      />
    )
  }
 
  render() {
    return (
      <>
        {
          this.props.page === 'mini' ?
          <>
            {this.displayCartProducts()}
          </>
          :
          <div className="cart-page-full">
            <h2 className="page-header2">
              Cart
            </h2>
            <hr/>
            {this.displayCartProducts()}
          </div>
        }
        <div className="cart-extra-details">
          <>
          <p className="tax">
            <span className="text">
              Tax
            </span>
            <span className="amount">
              {this.state.selectedCurrency && this.state.selectedCurrency.symbol}
              0
            </span>
          </p>
        
          <p className="quantity">
            <span className="text">
              Qty
            </span>
            <span className="amount">
              {this.props.cart.length}
            </span>
          </p>
          </>
          
          <p className="cart-total">
            <span className="text">
              Total
            </span>
            <span className="amount">
              {this.state.selectedCurrency && this.state.selectedCurrency.symbol}
              {this.getToTalCart()}
            </span>
          </p>
          <div className="cart-buttons">
            { this.props.page === 'mini' &&
              <div className="d-flex-col view-bag-link">
                <NavLink
                  to = {`/cart`}
                  onClick={() => store.dispatch(show_minicart())}
                >
                  View Bag
                </NavLink>
              </div>
            }
            <button type="button" className="checkout-btn">
              {
              this.props.page === 'mini' ?
                'CHECK OUT'
              :
                'ORDER'
              }
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default CartPage;
