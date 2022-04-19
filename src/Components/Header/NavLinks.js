import React, { Component} from 'react';
import store from '../../redux/configureStore';
import { graphql } from '@apollo/client/react/hoc';
import { getCategories } from '../../Apollo';
import CategoryLink from './CategoryLink';
import change_category_type from '../../redux/categorySelected/actions'

class NavLinks extends Component {
  constructor(props){
    super(props)  
    this.state={
      selectedCategory : '',
      categories:[],
    };
  };

  loadCategories = () => {
    var data = this.props.data;
    if (data.loading) return;
    if (data.categories.length === this.state.categories.length) return;
    if (this.state.selectedCategory === '') {
      store.dispatch(change_category_type(data.categories[0].name))
    };
    this.setState((prevState) => ({
      ...prevState,
      categories: data.categories
    }));
  }

  displayNavLinks = () => {
    if (this.state.categories.length < 1) {
      return (
        <div>Loading</div>
      )
    };
    return this.state.categories.map((category) => (
      <CategoryLink
        key={category.name}
        selectedCategory={this.state.selectedCategory}
        category={category}
      />
    ));
  };

  componentDidMount = () => {
    store.subscribe(() => {
      const { categoryReducer } = store.getState();
      const { categoryName } = categoryReducer;
      this.setState((prevState) => ({
        ...prevState,
        selectedCategory: categoryName,
      }))
    });
  }

  componentDidUpdate = () => {
    this.loadCategories();
  }
  
  render() {
    return (
      <nav>
        <ul className="navLinks d-flex">
          {this.displayNavLinks()}
        </ul>
      </nav>
    );
  }
};

export default graphql(getCategories)(NavLinks);