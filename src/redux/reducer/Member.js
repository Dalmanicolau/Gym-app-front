
import { ADD_MEMBER, SET_MEMBERS, SET_ERROR, MODIFY_MEMBER_SUCCESS, GET_MEMBERS, RENEW_MEMBER_PLAN_SUCCESS } from '../actions/Member';

const initialState = {
  members: [],
  total: 0,
  error: null,
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBERS:
      return { ...state, 
        members: action.payload.members,
        total: action.payload.total
      };
      case ADD_MEMBER:
        console.log("miembro añadido", action.payload);
        return { 
          ...state, 
          members: [...state.members, action.payload]
        };
        case GET_MEMBERS:
          return {
            ...state,
            members: action.payload
          }
      case MODIFY_MEMBER_SUCCESS:
        return { 
          ...state,
          members: state.members.map((member) =>
          member._id === action.payload._id ? action.payload : member)
        };
        case RENEW_MEMBER_PLAN_SUCCESS:
          return {
            ...state,
            members: state.members.map((member) =>
              member._id === action.payload._id ? action.payload : member)
          }      
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default memberReducer;
