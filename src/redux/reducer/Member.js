
import { ADD_MEMBER, SET_MEMBERS, SET_ERROR, MODIFY_MEMBER, GET_MEMBERS } from '../actions/Member';

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
      case MODIFY_MEMBER:
        return { 
          ...state,
          members: [...state.members, action.payload]
        };      
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default memberReducer;
