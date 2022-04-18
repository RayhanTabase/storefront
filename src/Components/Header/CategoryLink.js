import React, { Component} from 'react';
import store from '../../redux/configureStore';
import change_category_type from '../../redux/categorySelected/actions'
import { NavLink } from 'react-router-dom';


class CategoryLink extends Component {
  constructor(props){
    super(props)  
    this.state={
    }
  };

  changeCategory = (name) => {
    store.dispatch(change_category_type(name));
  };

  render() {
    return (
      <li
        className={`${this.props.category.name === this.props.selectedCategory && 'active-link'} nav-link`}
      >
      <NavLink
        onClick={()=> this.changeCategory(this.props.category.name)}
        to="/"
        className="nav-btn"
      >
        {this.props.category.name}
      </NavLink>
      </li>
    );
  }
};

export default CategoryLink;