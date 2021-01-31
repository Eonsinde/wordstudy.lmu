import { DELETE_BOOK, ADD_BOOK, EDIT_BOOK, BOOKS_LOADING, BOOKS_LOADED, SET_QUERY, SEARCHING, SEARCH_COMPLETE } from '../actions/types';


let initialState = {
    books: [],
    isLoading: false,
    filters: {
        queryText: '',
        catgory: null,
        isFiltering: false
    }
}


const book = (state=initialState, action) => {
    switch(action.type){
        case BOOKS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case BOOKS_LOADED:
            return {
                ...state,
                books: action.payload,
                isLoading: false
            }
            
        case SET_QUERY:
            return {
                ...state,
                filters: {...state.filters, queryText: action.searchText }
            }
        case SEARCHING:
            return {
                ...state, 
                filters: {...state.filters, isFiltering: true}
            }
        case SEARCH_COMPLETE:
            return {
                ...state, 
                books: action.payload,
                filters: {...state.filters, isFiltering: false}
            }

        case ADD_BOOK:
            return {
                ...state, 
                books: [...state.books, action.payload]
            }
        case EDIT_BOOK:
            return{
                ...state,
                books: [...state.books.filter(book => book.id !== action.payload.id), action.payload]
            }

        case DELETE_BOOK:
            return {
                ...state, 
                books: [...state.books.filter(book => book.title !== action.payload.title)]
            }

        default:
            return state;
    }
}

export default book;