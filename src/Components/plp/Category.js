import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import './category_page.css';
import ProductsIndex from './ProductsIndex';
import { getCategories } from '../../Apollo';


class Category extends Component {

  useCategory = () => {
    if (this.props.categoryName !== '') return this.props.categoryName;
    const data = this.props.data;
    if (data.loading) return '';
    return data.categories[0].name;
  }

  render() {
    return (
      <div className="plp-content">
        <h2 className="page-header">
          {this.useCategory()}
        </h2>
        <ProductsIndex
          categoryName={this.useCategory()}
        />
      </div>
    )
  }
}

export default graphql(getCategories)(Category);
