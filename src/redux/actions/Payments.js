import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GET_PAYMENTS = "GET_PAYMENTS";
export const ADD_PAYMENT = "ADD_PAYMENT";
export const SET_INCOME_BY_MONTH = "SET_INCOME_BY_MONTH";

export const addPayment = (paymentData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/payments`, paymentData);
    dispatch({ type: ADD_PAYMENT, payload: data });
  } catch (error) {
    console.error("Error al crear el pago:", error);
  }
};

export const getPayments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/payments`);
      dispatch({
        type: GET_PAYMENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error, "error en getPayments action");
    }
  };
};

export const getIncomePerMonth = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/payments/income-per-month`);

    dispatch({
      type: SET_INCOME_BY_MONTH,
      payload: data,
    });
    console.log("Income per month:", data);
  } catch (error) {
    console.error("Error fetching income per month:", error);
  }
};
