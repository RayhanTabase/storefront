import React, { Component} from 'react';
import { ApolloProvider } from "@apollo/client";
import client from './Apollo';
// import AppRoutes from './routes/routes';
import Header from './Components/Header/Header';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
          {/* <AppRoutes /> */}
      </ApolloProvider>
    )
  }
}

export default App;
