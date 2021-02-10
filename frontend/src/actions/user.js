import axios from 'axios';
import { CREATE_USER, DELETE_USER, UPDATE_USER, USERS_LOADED, USERS_LOADING, UPDATE_AUTH_USER } from './types';
import { createMessage } from './message';


export const getUsers = () => (dispatch, getState) => {
    // load books
    dispatch({type: USERS_LOADING});

    axios.get(`/accounts/all-users`, tokenConfig(getState))
        .then(res => dispatch({
            type: USERS_LOADED,
            payload: res.data
        }))
        .catch(err => console.error("Word Study Says:- ", err));
}

export const deleteUser = id => (dispatch, getState) => {
    axios.delete(`/profile/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_USER,
                payload: res.data,
                userID: id
            })
            dispatch(createMessage({deletedBook: `Deleted User`}))
        })
        .catch(err => createMessage({failed: 'Delete Failed'}));
}

export const updateUser = (id, newData) => (dispatch, getState) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization": `Token ${getState().auth.token}`
        }
    };

    axios.patch(`/profile/${id}/`, newData, config)
        .then(res => {
            dispatch({type: UPDATE_USER, payload: res.data})
            dispatch({type: UPDATE_AUTH_USER, payload: res.data});
            dispatch(createMessage({updatedBook: `Updated ${res.data.username}`}));
        })
        .catch(err => createMessage({failed: "Failed to update"}));
}

export const addUser = (formData) => (dispatch, getState) => {
     // headers
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization": `Token ${getState().auth.token}`
        }
    };

    axios.post(`/accounts/auth/register`, formData, config)
        .then(res => {dispatch({
                type: CREATE_USER,
                payload: res.data
            })
            dispatch(createMessage({addedBook: `Added ${res.data.username}`}))
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