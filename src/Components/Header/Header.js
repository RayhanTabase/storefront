import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import './header.css';
import brandLogo from '../../assets/brand_icon.svg';
import emptyCart from '../../assets/empty_cart.svg';
import dropDown from '../../assets/drop_down.svg';
import { getCurrencies } from '../../Apollo'
import store from '../../redux/configureStore';

class Header extends Component {
  constructor(props){
    super(props)  
    this.state={
        loadingCurrencies: true,
        selectedCurrency : {},
        availableCurrencies: []
    }  
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

  loadCurrencies = () => {
    var data = this.props.data
    if (data.loading) return;
    if (data.currencies.length === this.state.availableCurrencies.length) return;
    console.log(data);
    this.setState((prevState) => ({
      ...prevState,
      availableCurrencies: data.currencies,
    }))
  }

  componentDidUpdate = () => {
    this.loadCurrencies();
  }

  render() {
    console.log(this.state.availableCurrencies);
    return (
        <header className="d-flex">
          <ul className="navLinks d-flex">
            <li className="nav-link active-link">
              <p>
                Women
              </p>
            </li>
            <li className="nav-link">
              <p>
                Men
              </p>
            </li>
            <li className="nav-link">
              <p>
                Kids
              </p>
            </li>
          </ul>
          <img src={brandLogo} alt="logo" className="logo"/>
          <ul className="actions d-flex">
            <li className="currencySwitcher d-flex">
              <p>
                {this.state.selectedCurrency.symbol}
              </p>
              <button type="button" className="btn-colorless">
                <img height={10} src={dropDown} alt="drop down" className="sx-icon"/>
              </button>
              <div className="currency-options">
                {this.state.availableCurrencies.map((currency) => {
                  return (
                    <div className="currency-option-display">
                      <p>{currency.symbol}</p>
                      <p>{currency.label}</p>
                    </div>
                  )
                })}
                {this.state.availableCurrencies.map((currency) => (
                  <div className="currency-option-display">
                    <p>{currency.symbol}</p>
                    <p>{currency.label}</p>
                  </div>
                ))}
              </div>
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
            aa
          </div>
        </header>
    )
  }
}

export default  graphql(getCurrencies)(Header);
