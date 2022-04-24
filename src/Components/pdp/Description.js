import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getDescription } from '../../Apollo';
import './description.css';
import DisplayText from './DisplayText';
import DisplaySwatch from './DisplaySwatch';
import store from '../../redux/configureStore';
import { add_to_cart } from '../../redux/shopping_cart/actions';

class Description extends Component {
  constructor(props){
    super(props)  
    this.state={
      selectedImage : null,
      selectedAttributes: {},
      selectedCurrency: null,
      cart : []
    };
  };

  addAttribute = (id, value) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedAttributes : {
        ...prevState.selectedAttributes,
        [id] : value
      }
    }));
  }

  changeSelectedImage = (source) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedImage: source,
    }));
  }

  checkAttrubutesSelected = () => {
    const data = this.props.data;
    if (data.loading) return;
    const attributes = data.product.attributes;
    if (attributes.length !== Object.keys(this.state.selectedAttributes).length) return false;
    return true;
  }

  addToCart = () => {
    //check attributes selected
    if ( !this.checkAttrubutesSelected()) {
      // error message
      alert('Please make a selection for all product attributes');
      return;
    }
    const data = this.props.data;
    if (data.loading) return;
    const product_id = data.product.id
    console.log(this.state.cart);
    let item = this.state.cart.find((item) => JSON.stringify(item.attributes) === JSON.stringify(this.state.selectedAttributes) && item.id === this.props.product_id)
    if (item !== undefined) {
      alert('This item is already in the cart')
      return;
    }
    store.dispatch(add_to_cart({id: product_id, attributes: this.state.selectedAttributes, quantity:1 }));
    // success message
    alert(`Successfully added ${data.product.name} to cart`)
  }

  loadDescription = () => {
    var data = this.props.data;
    if (data.loading) return '';
    const product = data.product
    let price = product.prices[0];
    if (this.state.selectedCurrency !== null) {
      price = product.prices.find((price) => (price.currency.label === this.state.selectedCurrency.label));
    }
    return (
      <>
        <div className="product-thumbnails">
          {
            product.gallery.map((imageSource) => {
              return (
                <button
                  key={imageSource}
                  className="btn-colorless thumbnail"
                  type="button"
                  onClick={() =>  this.changeSelectedImage(imageSource)}
                >
                  <img src={imageSource} alt={product.name}/>
                </button>
              )
            })
          }
        </div>
        <div className="product-image">          
          <img src={this.state.selectedImage ? this.state.selectedImage: product.gallery[0]} alt={product.name} />
        </div>
        <div className="product-details"> 
          <p className="product-brand">
            {product.brand}
          </p>
          <p className="product-name">
            {product.name}
          </p>

          <div className="product-attributes">
            {product.attributes.map((attribute) => {
              if (attribute.type === "text") {
                return (
                  <DisplayText
                    key={attribute.name}
                    attribute={attribute}
                    addAttribute={this.addAttribute}
                    selectedAttributes={this.state.selectedAttributes}
                    cartPage={false}
                  />
                )
              }else if (attribute.type === "swatch") {
                return (
                  <DisplaySwatch
                    key={attribute.name}
                    attribute={attribute}
                    addAttribute={this.addAttribute}
                    selectedAttributes={this.state.selectedAttributes}
                    cartPage={false}
                  />
                )
              } else {return ''}
            })}
          </div>

          <p className="product-price">
            <span className="text">
              PRICE:
            </span>
            <span className="amount d-flex">
              <span>
                {price.currency.symbol}
              </span>
              <span>
                {price.amount}
              </span>
            </span>
          </p>
          
          <button
            type="button"
            className="add-toCart-btn"
            onClick={this.addToCart}
          >
            ADD TO CART
          </button>
         
          <div className="product-information" dangerouslySetInnerHTML={{__html: `${product.description}`}} />
        </div>
      </>
    )
  }

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
    const { currencyReducer, cartReducer } = store.getState();
    const { currencyType } = currencyReducer;
    const { cart } = cartReducer;
    if (this.state.selectedCurrency !== currencyType) {
      this.setState((prevState) => ({
        ...prevState,
        selectedCurrency: currencyType,
      }))
    }
    if (this.state.cart !== cart ) {
      this.setState((prevState) => ({
        ...prevState,
        cart:cart
      }))
    }
  }

  componentDidUpdate = () => {
    const { currencyReducer, cartReducer } = store.getState();
    const { currencyType } = currencyReducer;
    const { cart } = cartReducer;
    if (this.state.selectedCurrency !== currencyType) {
      this.setState((prevState) => ({
        ...prevState,
        selectedCurrency: currencyType,
      }))
    }
    if (this.state.cart !== cart ) {
      this.setState((prevState) => ({
        ...prevState,
        cart:cart
      }))
    }
  }

  render() {
    return (
      <div className="product-description d-flex">
        {this.loadDescription()}
      </div>
    )
  }
}

export default graphql(getDescription, {
  options: (props) => {
    return {
      variables: {
        id: props.product_id
      },
      // nextFetchPolicy: 'no-cache'
    }
  }
})(Description);
