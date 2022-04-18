import React, { Component} from 'react';
import store from '../../redux/configureStore';
import change_currency_type from '../../redux/currency_type/actions';

class CurrencyPicker extends Component {

  changeCurrency = () => {
    store.dispatch(change_currency_type(this.props.currency));
  }

  render() {
    return (
      <button
        className="btn-colorless currency-option-display"
        onClick={this.changeCurrency} 
      >
        <p>{this.props.currency.symbol}</p>
        <p>{this.props.currency.label}</p>
      </button>
    )
  }
}

export default CurrencyPicker;
