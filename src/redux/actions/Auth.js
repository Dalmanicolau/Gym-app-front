import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const signup = (username, password) => {
  return async (dispatch) => {
    try {
      const json = await axios.post(`${BASE_URL}/users/signup`, {
        username,
        password,
      });
      return dispatch({
        type: SIGNUP,
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "error en signup action");
    }
  };
};

export const login = (userData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/login`, userData);
      dispatch({
        type: LOGIN, // Cambio a LOGIN aquí
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error, "error en login action");
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const json = await axios.post(`${BASE_URL}/users/logout`);
      return dispatch({
        type: LOGOUT,
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "error en logout action");
    }
  };
};
