import { GET_CATEGORIES } from "../actions/types"


let initialState = {
    categories: []
}


const category = (state=initialState, action) => {
    switch(action.type){
        case GET_CATEGORIES:
            return {
                ...state, 
                categories: action.payload
            }
        default:
            return state;
    }
}

export default category;