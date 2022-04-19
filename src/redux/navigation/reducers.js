import { CHANGE_PRODUCT } from './constants';

const initialState = {
  product_id: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PRODUCT:
      return {
        ...state,
        product_id: action.payload
      };
    default:
      return state;
  }
};

export default reducer;