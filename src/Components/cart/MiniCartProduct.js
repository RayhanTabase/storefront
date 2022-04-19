import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getItem } from '../../Apollo';
import store from '../../redux/configureStore';

class MiniCartProduct extends Component {
  constructor(props){
    super(props)  
    this.state={
      selectedCurrency: null,
      cart: []
    };
  };

  componentDidMount = () => {
    store.subscribe(() => {
      const { currencyReducer, cartReducer } = store.getState();
      const { currencyType } = currencyReducer;
      const { cart } = cartReducer;
      this.setState((prevState) => ({
        ...prevState,
        selectedCurrency: currencyType,
        cart:cart
      }))
    });
  }

  render() {
    return (
      <div className="">
        
      </div>
    )
  }
}

export default graphql(getItem, {
  options: (props) => {
    return {
      variables: {
        id: 'ps-5'
      }
    }
  }
})(MiniCartProduct);
