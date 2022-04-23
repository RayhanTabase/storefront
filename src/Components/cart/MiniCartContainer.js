import React, { Component} from 'react';
import './mini_cart.css';
import store from '../../redux/configureStore';
// import { show_minicart } from '../../redux/navigation/actions';

class MiniCartContainer extends Component {
  constructor(props){
    super(props)
    // this.wrapperRef = React.createRef();
    // this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      cart: []
    }
  };

  // handleClickOutside(event) {
  //   if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
  //     if (event.target.className.includes('cartMenuBtn')) return;
  //     store.dispatch(show_minicart())
  //   }
  // }

  componentDidMount = () => {
    // document.addEventListener("mousedown", this.handleClickOutside);    
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    this.setState((prevState) => ({
      ...prevState,
      cart: cart,
    }))
  }

  componentWillUnmount() {
    // document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate = () => {
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    if (this.state.cart.length !== cart.length) {
      this.setState((prevState) => ({
        ...prevState,
        cart: cart,
      }))
    }
  }

  render() {
    return (
      <div 
        // ref={this.wrapperRef}
        className="display-mini-cart"
      >
         <p className="header">
            <span className="title">My Bag,</span>
            <span className="count">{this.state.cart.length} items</span>
          </p>
        {this.props.children}
      </div>
    )
  }
}

export default MiniCartContainer;
