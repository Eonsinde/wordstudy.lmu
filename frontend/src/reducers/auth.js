import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_USER,
    UPDATE_AUTH_USER
} from '../actions/types';


let initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
}


export default function auth(state=initialState, action){
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case UPDATE_AUTH_USER:
            return {
                ...state,
                user: action.payload.id === state.user.id ? action.payload : state.user
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload, // to set the user and the token in our redux state
                isAuthenticated: true,
                isLoading: false
            };
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state, 
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }

        case UPDATE_USER:
            return {
                ...state
            }
            
        case LOGOUT_FAIL:
        default:
            return state; 
    }
}