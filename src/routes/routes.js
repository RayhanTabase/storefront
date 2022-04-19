import React, { Component} from 'react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import store from '../redux/configureStore';
import Category from '../Components/PLP/Category';
import Description from '../Components/PDP/Description';
import Cart from '../Components/cart/Cart';

class AppRoutes extends Component {
  constructor(props){
    super(props)  
    this.state={
      product_id: '',
      categoryName: '',
    };
  };

  componentDidMount = () => {
    store.subscribe(() => {
      const { navigationReducer, categoryReducer } = store.getState();
      const { product_id } = navigationReducer;
      const { categoryName } = categoryReducer;
      this.setState((prevState) => ({
        ...prevState,
        product_id: product_id,
        categoryName: categoryName,
      }))
    });
  }

  render() {
    return (
      <Suspense>
        <Routes>
          <Route path="/" element={<Category categoryName={this.state.categoryName} />} />
          {
            this.state.product_id !== '' &&
            <Route exact path="/description" element={<Description product_id={this.state.product_id} />} />
          }
          <Route path="/cart" element={<Cart page={'full'} />}/>
          <Route path="/*" element={<Category categoryName={this.state.categoryName} />}/>
        </Routes>
      </Suspense>
    )
  }
}

export default AppRoutes;
