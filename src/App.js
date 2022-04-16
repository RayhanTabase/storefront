import React, { Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import Header from './Components/Header/Header';


class App extends Component {

  render() {
    return (
    <BrowserRouter>
      <div>
        <Header />
        <AppRoutes />
      </div>
    </BrowserRouter>
    )
  }
}

export default App;
