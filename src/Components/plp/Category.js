import React, { Component} from 'react';
import store from '../../redux/configureStore';
import './category_page.css';
import ProductsIndex from './ProductsIndex';

class Category extends Component {
  constructor(props){
    super(props)  
    this.state={
      categoryName: ''
    };
  };

  componentDidMount = () => {
    store.subscribe(() => {
      const { categoryReducer } = store.getState();
      const {categoryName} = categoryReducer;
      this.setState((prevState) => ({
        ...prevState,
        categoryName: categoryName,
      }))
    });
  }

  render() {
    return (
      <div className="plp-content">
        <h2 className="category-title">
          {this.state.categoryName}
        </h2>
        <ProductsIndex
          categoryName={this.state.categoryName}
        />
      </div>
    )
  }
}

export default Category;
