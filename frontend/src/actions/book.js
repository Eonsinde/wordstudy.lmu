import axios from 'axios';
import { createMessage } from './message';
import { ADD_BOOK, BOOKS_LOADED, BOOKS_LOADING, DELETE_BOOK, EDIT_BOOK, SEARCHING, SEARCH_COMPLETE, SET_QUERY } from './types';


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

export const setStateQuery = queryPerTime => (dispatch, getState) => { // handles updating the queryText in our redux state
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

export const deleteBook = id => (dispatch, getState) => {
    axios.delete(`/books/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_BOOK,
                payload: res.data.book
            })
            dispatch(createMessage({deletedBook: `Deleted Book`}))
        })
        .catch(err => createMessage({failed: 'Delete Failed'}));
}

export const updateBook = (id, newData) => (dispatch, getState) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization": `Token ${getState().auth.token}`
        }
    };

    axios.patch(`/books/${id}/`, newData, config)
        .then(res => {
            dispatch({type: EDIT_BOOK, payload: res.data})
            dispatch(createMessage({updatedBook: `Updated ${res.data.title}`}));
        })
        .catch(err => createMessage({failed: "Failed to update"}));
}

export const addBook = (data) => (dispatch, getState) => {
     // headers
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization": `Token ${getState().auth.token}`
        }
    };

    const bookFormData = new FormData();

    bookFormData.append('title', data.title);
    bookFormData.append('author', data.author);
    bookFormData.append('file', data.file, data.fileName);
    bookFormData.append('genre', JSON.stringify({
        name: data.genre
    })); 

    axios.post(`/books/`, bookFormData, config)
        .then(res => {dispatch({
                type: ADD_BOOK,
                payload: res.data.book
            })
            dispatch(createMessage({addedBook: `Added ${res.data.book.title}`}))
        })
        .catch(err => dispatch(createMessage({failed: `Operation Failed`})));
}


export const tokenConfig = getState => {
    // get the token from state     
    const token = getState().auth.token // we're looking into our redux state, under auth reducer then the current state

    // headers 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // if token, add to headers config 
    if (token)
        config.headers['Authorization'] = `Token ${token}`;

    return config;
}