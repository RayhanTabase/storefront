import { CHANGE_PRODUCT, SHOW_MINICART } from './constants';

const initialState = {
  product_id: '',
  showMiniCart: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PRODUCT:
      return {
        ...state,
        product_id: action.payload
      };
    case SHOW_MINICART:
      return {
        ...state,
        showMiniCart: !state.showMiniCart
      };
    default:
      return state;
  }
};

export default reducer;