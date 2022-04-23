import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import change_currency_type from '../../redux/currency_type/actions';
import { getCurrencies } from '../../Apollo';
import store from '../../redux/configureStore';
import './header.css';
import brandLogo from '../../assets/brand_icon.svg';
import dropDown from '../../assets/drop_down.svg';
import dropUp from '../../assets/drop_up.svg';
import NavLinks from './NavLinks';
import CartButton from '../cart/CartButton';
import ChangeCurrencyMenu from './ChangeCurrencyMenu';

class Header extends Component {
  constructor(props){
    super(props)
    this.state={
        selectedCurrency : null,
        availableCurrencies: [],
        showCurrencyPicker: false,
        cart: []
    };
  }

  setCurrency = () => {
    const data = this.props.data;
    if (data.loading) return;
    if (data.currencies.length === this.state.availableCurrencies.length) return;
    if (this.state.selectedCurrency === null) {
      store.dispatch(change_currency_type(data.currencies[0]));
    };
    this.setState((prevState) => ({
      ...prevState,
      availableCurrencies: data.currencies,
    }));
  }

  displayCurrencyDropDown = () => {
    this.setState((prevState) => ({
      ...prevState,
      showCurrencyPicker: !prevState.showCurrencyPicker
    }));
  }

  componentDidUpdate = () => {
    this.setCurrency();
  }

  componentDidMount = () => {
    store.subscribe(() => {
      const { currencyReducer, cartReducer } = store.getState();
      const { currencyType } = currencyReducer;
      const { cart } = cartReducer;
      this.setState((prevState) => ({
        ...prevState,
        selectedCurrency: currencyType,
        cart: cart
      }))
    });
  }

  render() {
    return (
        <header className="d-flex">
          <NavLinks />
          <img src={brandLogo} alt="logo" className="logo"/>
          <ul className="actions">
            <li className="currencySwitcher d-flex">
              <p>
                {this.state.selectedCurrency && this.state.selectedCurrency.symbol}
              </p>
              <button type="button" className="btn-colorless displayCurrencyOptionsBtn" onClick={this.displayCurrencyDropDown}>
              {
                this.state.showCurrencyPicker ?
                  <img height={10} src={dropUp} alt="drop down" className="sx-icon displayCurrencyOptionsBtn"/>
                :
                  <img height={10} src={dropDown} alt="drop down" className="sx-icon displayCurrencyOptionsBtn"/>
              }
              </button>
              {
                this.state.showCurrencyPicker &&
                <ChangeCurrencyMenu
                  currencies={this.state.availableCurrencies}
                  closeMenu={this.displayCurrencyDropDown}
                  showCurrencyPicker={this.state.showCurrencyPicker}
                />
              }
            </li>
            <li className="shopping-cart cartMenuBtn">
              <div className="cart-items-number cartMenuBtn">
                {
                  this.state.cart.length > 0 && 
                  <p className="bullet cartMenuBtn">
                    {this.state.cart.length}
                  </p>
                }
              </div>
              <CartButton />
            </li>
          </ul>
        </header>
    )
  }
}

export default graphql(getCurrencies)(Header);
