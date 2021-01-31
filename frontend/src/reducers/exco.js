import { ADD_EXCO, DELETE_EXCO, EDIT_EXCO, EXCOS_LOADED, EXCOS_LOADING } from "../actions/types"



let initialState = {
    excos_list: [],
    isLoading: false
}


const exco = (state=initialState, action) => {
    switch (action.type){
        case EXCOS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case EXCOS_LOADED:
            return {
                ...state,
                isLoading: false,
                excos_list: [...action.payload]
            }
        case ADD_EXCO:
            return {
                ...state,
                excos_list: [...state.excos_list, action.payload]
            }
        case EDIT_EXCO:
            return {
                ...state,
                excos_list: [...state.excos_list.filter(exco => exco.id !== action.payload.id), action.payload ]
            }
        case DELETE_EXCO:
            return {
                ...state,
                excos_list: [...state.excos_list.filter(exco => exco.id !== action.excoID)]
            }
        default:
            return state;
    }
}

export default exco;
