import axios from 'axios';
import { BOOKS_LOADED, BOOKS_LOADING, SEARCHING, SEARCH_COMPLETE, SET_QUERY } from './types';


export const getBooks = () => dispatch => {
    // load books
    dispatch({type: BOOKS_LOADING});

    const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    };

    axios.get(`/books`, config)
        .then(res => dispatch({
            type: BOOKS_LOADED,
            payload: res.data
        }))
        .catch(err => console.error("Word Study Says:- ",err));
}

export const setStateQuery = (queryPerTime) => (dispatch, getState) => { // handles updating the queryText in our redux state
    dispatch({type: SET_QUERY,  searchText: queryPerTime});
    // console.log("The queryPerTime in the action", queryPerTime);

    dispatch({type: SEARCHING});
    axios.get(`/books?title=${getState().book.filters.queryText}`)
        .then(res => dispatch({
            type: SEARCH_COMPLETE,
            payload: res.data
        }))
        .catch(err => console.error("Word Study Says:-", err));
}