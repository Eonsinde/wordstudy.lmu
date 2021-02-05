import { CREATE_USER, DELETE_USER, UPDATE_USER, USERS_LOADED, USERS_LOADING } from '../actions/types';


let initialState = {
    users: [],
    isLoading: false
}


export default function user(state=initialState, action){
    switch (action.type){
        case USERS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USERS_LOADED:
            return {
                ...state, 
                users: action.payload,
                isLoading : false
            }
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case DELETE_USER:
            return {
                ...state,
                users: [...state.users.filter(user => user.id !== action.userID)]
            }
        case UPDATE_USER:
            return {
                ...state,
                users: [...state.users.filter(user => user.id !== action.payload.id), action.payload]
            }
        default:
            return state;
    }
}