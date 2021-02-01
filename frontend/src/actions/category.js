import axios from "axios";
import { ADD_GENRE, GET_CATEGORIES, EDIT_GENRE, DELETE_GENRE } from "./types";
import {createMessage} from './message';


export const getCategories = () => dispatch => {
    axios.get('/genres')
        .then(res => dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        }))
        .catch(err => console.error(err))
}

export const deleteGenre = id => (dispatch, getState) => {
    axios.delete(`/genres/${id}/`, tokenConfig(getState))
        .then(res => {dispatch({
                type: DELETE_GENRE,
                catID: id
            })
            dispatch(createMessage({deletedBook: `Deleted Genre`}))
        })
        .catch(err => createMessage({failed: 'Delete Failed'}));
}

export const updateGenre = (id, newData) => (dispatch, getState) => {
    axios.patch(`/genres/${id}/`, newData, tokenConfig(getState))
        .then(res => {
            dispatch({type: EDIT_GENRE, payload: res.data})
            dispatch(createMessage({updatedBook: `Updated ${res.data.name}`}))
        })
        .catch(err => createMessage({failed: "Failed to update"}));
}

export const addGenre = (data) => (dispatch, getState) => {
    // send the data directly
    axios.post(`/genres/`, data, tokenConfig(getState))
        .then(res => {dispatch({
                type: ADD_GENRE,
                payload: res.data
            })
            dispatch(createMessage({addedBook: `Added ${res.data.name}`}))
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