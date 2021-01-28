import { EXCOS_LOADED, EXCOS_LOADING } from "../actions/types"



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
        default:
            return state;
    }
}

export default exco;
