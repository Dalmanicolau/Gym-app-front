import axios from 'axios';

import { 
  FETCH_NOTIFICATIONS_REQUEST, 
  FETCH_NOTIFICATIONS_SUCCESS, 
  FETCH_NOTIFICATIONS_FAILURE 
} from '../constants/notificationsConstants';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchNotifications = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_NOTIFICATIONS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/notifications/expiring`); // Ajusta tu endpoint

    dispatch({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      payload: data.notifications,
    });
  } catch (error) {
    dispatch({
      type: FETCH_NOTIFICATIONS_FAILURE,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message,
    });
  }
};
