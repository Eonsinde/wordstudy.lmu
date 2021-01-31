import { ADD_GENRE, DELETE_GENRE, EDIT_GENRE, GET_CATEGORIES } from "../actions/types"


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
        case ADD_GENRE:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case EDIT_GENRE:
            return{
                ...state,
                categories: [...state.categories.filter(cat => cat.id !== action.payload.id), action.payload]
            }
        case DELETE_GENRE:
            return {
                ...state,
                categories: [...state.categories.filter(cat => cat.id !== action.catID)]
            }
        default:
            return state;
    }
}

export default category;