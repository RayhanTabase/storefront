import { ADD_TO_CART, REMOVE_FROM_CART } from './constants';

export const add_to_cart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

export const remove_from_cart = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});