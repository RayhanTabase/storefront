import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getProductsCategory } from '../../Apollo';

class Category extends Component {
  render() {
    console.log(this.props)
    return (
        <div>
          Hello world
        </div>
    )
  }
}

export default graphql(getProductsCategory)(Category);
