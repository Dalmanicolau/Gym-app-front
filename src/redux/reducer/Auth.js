import { SIGNUP, LOGIN, LOGOUT } from '../actions/Auth';

const initialState = {
    user: {},
    isLoggedIn: false  // Cambié 'login' a 'isLoggedIn' para mayor claridad
};

const authReducer  = (state = initialState, action) => {
    switch(action.type) {
        case SIGNUP: {
            return {
                ...state,
                user: action.payload,
            }
        }
        case LOGIN: {
            return {
                ...state,
                user: action.payload,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: action.payload,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
};

export default authReducer;