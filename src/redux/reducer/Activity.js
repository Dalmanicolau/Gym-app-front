import { SET_ACTIVITIES, SET_ACTIVITY_ERROR } from '../actions/Activity';

const initialState = {
  activities: [],
  error: null,
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        error: null,
      };
    case SET_ACTIVITY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default activityReducer;
