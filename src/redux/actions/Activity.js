import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const SET_ACTIVITIES = 'SET_ACTIVITIES';
export const SET_ACTIVITY_ERROR = 'SET_ACTIVITY_ERROR';

// Acción para obtener todas las actividades disponibles
export const fetchActivities = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/activities`);
    dispatch({
      type: SET_ACTIVITIES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_ACTIVITY_ERROR,
      payload: error.message,
    });
  }
};
