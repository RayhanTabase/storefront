import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import cartReducer from './shopping_cart/reducers';
import currencyReducer from './currency_type/reducers';
import categoryReducer from './categorySelected/reducers';
import navigationReducer from './navigation/reducers';

const reducer = combineReducers({
  cartReducer,
  currencyReducer,
  categoryReducer,
  navigationReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
