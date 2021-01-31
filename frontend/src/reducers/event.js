import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_EVENTS } from "../actions/types"


let initialState = {
    events: []
}


const category = (state=initialState, action) => {
    switch(action.type){
        case GET_EVENTS:
            return {
                ...state, 
                events: action.payload
            }
        case ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case EDIT_EVENT:
            return{
                ...state,
                events: [...state.events.filter(evt => evt.id !== action.payload.id), action.payload]
            }
        case DELETE_EVENT:
            return {
                ...state,
                events: [...state.events.filter(evt => evt.id !== action.evtID)]
            }
        default:
            return state;
    }
}

export default category;