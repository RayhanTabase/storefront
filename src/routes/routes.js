import React, { Component} from 'react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../Components/plp/Category';

class AppRoutes extends Component {
  render() {
    return (
      <Suspense>
        <Routes>
          <Route path="/" element={<Category />} />
        </Routes>
      </Suspense>
    )
  }
}

export default AppRoutes;
