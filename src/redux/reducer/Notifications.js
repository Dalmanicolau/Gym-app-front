import { GET_NOTIFICATIONS } from "../actions/Notifications";

const initialState = {
  loading: false,
  notifications: [],
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_NOTIFICATIONS:
          return {
              ...state,
              loading: false,
              notifications: action.payload
          };
      default:
          return state;
  }
};

export default notificationsReducer;
