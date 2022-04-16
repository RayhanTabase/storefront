import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import './header.css';
import brandLogo from '../../assets/brand_icon.svg';
import emptyCart from '../../assets/empty_cart.svg';
import dropDown from '../../assets/drop_down.svg';
import dropUp from '../../assets/drop_up.svg';
import { getCurrencies } from '../../Apollo';
import store from '../../redux/configureStore';
import CurrencyPicker from './CurrencyPicker';
import NavLinks from './NavLinks';
import change_currency_type from '../../redux/currency_type/actions';

class Header extends Component {
  constructor(props){
    super(props)  
    this.state={
        loadingCurrencies: true,
        selectedCurrency : null,
        availableCurrencies: [],
        showCurrencyPicker: false
    };
  }

  loadCurrencies = () => {
    var data = this.props.data;
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

  displayCurrencies = () => {
    if (this.state.availableCurrencies.length < 1) {
      return (
        <div>Loading</div>
      )
    };
    return this.state.availableCurrencies.map((currency) => (
      <CurrencyPicker
        key={currency.symbol}
        currency={currency}
      />
    ));
  }

  displayCurrencyDropDown = () => {
    this.setState((prevState) => ({
      ...prevState,
      showCurrencyPicker: !prevState.showCurrencyPicker
    }));
  }

  componentDidUpdate = () => {
    this.loadCurrencies();
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
              <button type="button" className="btn-colorless" onClick={this.displayCurrencyDropDown}>
              {
                this.state.showCurrencyPicker ?
                  <img height={10} src={dropUp} alt="drop down" className="sx-icon"/>
                :
                  <img height={10} src={dropDown} alt="drop down" className="sx-icon"/>
              }
              </button>
              {
                this.state.showCurrencyPicker ?
                <div className="currency-options">
                  {this.displayCurrencies()}
                </div>
                :
                ''
              }
            </li>
            <li className="shopping-cart">
              <div className="cart-items-number">
                <p className="bullet">
                  1
                </p>
              </div>
              <button type="button" className="btn-colorless">
                <img src={emptyCart} alt="empty cart" className=""/>
              </button>
            </li>
          </ul>
          <div className="display-cart">
            empty
          </div>
        </header>
    )
  }
}

export default graphql(getCurrencies)(Header);
