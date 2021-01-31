import { GET_ERRORS } from '../actions/types';


let initialState = {
    title: '',
    msg: '',
    status: null
}

const error = (state=initialState, action) => {
    switch(action.type){
        case GET_ERRORS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;   
    }
}

export default error;