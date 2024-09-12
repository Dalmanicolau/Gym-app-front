import { GET_PAYMENTS, SET_INCOME_BY_MONTH, ADD_PAYMENT } from "../actions/Payments";

const initialState = {
  payments: [],
  incomePerMonth: [],
};

const Payments = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENTS:
      return {
        ...state,
        payments: action.payload,
      };
    case SET_INCOME_BY_MONTH:
      return {
        ...state,
        incomePerMonth: action.payload,
      };
    case ADD_PAYMENT:
      return {
        ...state,
        payments: [...state.payments, action.payload],
      };
    default:
      return state;
  }
};

export default Payments;
