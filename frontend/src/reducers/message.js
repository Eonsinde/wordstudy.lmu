import { CREATE_MESSAGE }  from '../actions/types';


let initialState = {};


const message = (state=initialState, action) => {
    switch (action.type){
        case CREATE_MESSAGE:
            return (state=action.payload);
        default:
            return state;
    }
}

export default message;