import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const ADD_MEMBER = "ADD_MEMBER";
export const SET_MEMBERS = "SET_MEMBERS";
export const SET_ERROR = "SET_ERROR";
export const MODIFY_MEMBER_SUCCESS = "MODIFY_MEMBER_SUCCESS";
export const GET_MEMBERS = "GET_MEMBERS";
export const MODIFY_MEMBER_FAIL = "MODIFY_MEMBER_FAIL";
export const RENEW_MEMBER_PLAN_SUCCESS = "RENEW_MEMBER_PLAN_SUCCESS";

// Acción para agregar un miembro
export const addMember = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/members`, formData);
    const member = response.data;
    
    dispatch({ 
      type: ADD_MEMBER, 
      payload: member 
    });
    return member;
  } catch (error) {
    dispatch({type:SET_ERROR, payload: error.message})
    console.error("Error al agregar miembro:", error);
    throw error;
  }
};


export const modifyMember = (member) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/members/${member._id}`, member);
    dispatch({
      type: MODIFY_MEMBER_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: MODIFY_MEMBER_FAIL,
      payload: error.response ? error.response.data : error.message,
    });
    throw error;
  }
};


// Acción para renovar el plan de un miembro
export const renewMemberPlan = (memberId) => async (dispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}/members/${memberId}/renew`);
    dispatch({
      type: RENEW_MEMBER_PLAN_SUCCESS,
      payload: response.data,
    });
    return response.data; 
  } catch (error) {
    dispatch({
      type: 'RENEW_MEMBER_PLAN_FAILURE',
      payload: error,
    });
    throw error; 
  }
};

export const setMembers = (members) => ({
  type: SET_MEMBERS,
  payload: members,
});

// Acción para obtener los miembros
export const fetchMembers = (page = 1, limit = 10, searchTerm = '' ) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/members?page=${page}&limit=${limit}&searchTerm=${searchTerm}`);
    dispatch(setMembers(data));
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const getMembers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/members/all`);
      dispatch({
        type: GET_MEMBERS,
        payload: data,
      });
    } catch (error) {
        console.error(error, "Error en memberAction")
    }
  } 
};
