import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

export const getProductsCategory = gql`
{ 
  category(input:{title:"all"}){
    name,
    products {
      id,
      name,
      inStock,
      gallery,
      description,
      category,
      attributes{
        id,
        name,
        type,
        items {
          displayValue,
          value,
          id
        }
      },
      prices{
        currency{
          label,
          symbol
        },
        amount
      },
      brand
    }
  }
}
`


export const categoriesPageDisplay = gql`
{ 
  category(input:{title:"all"}){
    products {
      id,
      name,
      inStock,
      gallery,
      prices{
        currency{
          label,
          symbol
        },
        amount
      },
    }
  }
}
`


export const getProductSingle = gql`
{ 
  product(id: "huarache-x-stussy-le") {
    id,
    name,
    inStock,
    gallery,
    description,
    category,
    attributes{
      id,
      name,
      type,
      items {
        displayValue,
        value,
        id
      }
    },
    prices {
      currency{
        label,
        symbol
      },
      amount
    },
    brand
  }
}
`

// use redux to record id of items added to cart and also the quantity
export const getCartItems = gql`
{ 
  product(id: "huarache-x-stussy-le") {
    id,
    name,
    brand,
    inStock,
    gallery,
    attributes{
      id,
      name,
      type,
      items {
        displayValue,
        value,
        id
      }
    },
    prices {
      currency{
        label,
        symbol
      },
      amount
    },
  }
}
`

export const getCurrencies = gql`
{ 
  currencies {
    label,
    symbol
  }
}
`

export default client;