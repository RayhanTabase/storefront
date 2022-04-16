import { CHANGE_CURRENCY_TYPE } from './constants';

export const change_currency_type = (payload) => ({
  type: CHANGE_CURRENCY_TYPE,
  payload,
});
