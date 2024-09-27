import axios from 'axios';

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getNotifications = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/notifications`);
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: data,
      });
    } catch (error) {
        console.error(error, "Error en notificationAction")
    }
  } 
};
