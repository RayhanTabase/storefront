import React, { Component} from 'react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import store from '../redux/configureStore';
import Category from '../Components/PLP/Category';
import Description from '../Components/PDP/Description';
import Cart from '../Components/Cart/Cart';

class AppRoutes extends Component {
  constructor(props){
    super(props)  
    this.state={
      productId: '',
      categoryName: '',
    };
  }

  componentDidMount = () => {
    store.subscribe(() => {
      const { navigationReducer, categoryReducer } = store.getState();
      const { productId } = navigationReducer;
      const { categoryName } = categoryReducer;
      this.setState((prevState) => ({
        ...prevState,
        productId,
        categoryName,
      }));
    });
  }

  render() {
    return (
      <Suspense>
        <Routes>
          <Route path="/" element={<Category categoryName={this.state.categoryName} />} />
          {
            this.state.productId !== '' &&
            <Route exact path="/description" element={<Description productId={this.state.productId} />} />
          }
          <Route path="/cart" element={<Cart page="full" />} />
          <Route path="/*" element={<Category categoryName={this.state.categoryName} />} />
        </Routes>
      </Suspense>
    )
  }
}

export default AppRoutes;
