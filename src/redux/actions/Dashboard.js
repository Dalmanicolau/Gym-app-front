import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";

export const getDashboardData = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/dashboard`);
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching dashboard data", error);
  }
};
