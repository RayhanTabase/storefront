import React, { Component} from 'react';
import store from '../../redux/configureStore';
import './mini_cart.css';

class MiniCart extends Component {
  constructor(props){
    super(props)
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this); 
    this.state={
      showMiniCart: false,
      selectedCurrency: null,
      cart : []
    };
  };
  
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.showMiniCart();
    }
  }

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
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

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    return (
      <div 
        className="display-mini-cart"
        ref={this.wrapperRef}
      >
          empty
      </div>
    )
  }
}

export default MiniCart;
