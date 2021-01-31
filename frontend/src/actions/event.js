import axios from "axios";
import {createMessage} from './message';
import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_EVENTS } from "./types";


export const getEvents = () => dispatch => {
    axios.get('/events')
        .then(res => dispatch({
            type: GET_EVENTS,
            payload: res.data
        }))
        .catch(err => console.error(err))
}

export const deleteEvent = id => (dispatch, getState) => {
    axios.delete(`/events/${id}/`, tokenConfig(getState))
        .then(res => {dispatch({
                type: DELETE_EVENT,
                evtID: id
            })
            dispatch(createMessage({deletedBook: `Deleted Category`}))
        })
        .catch(err => createMessage({failed: 'Delete Failed'}));
}

export const updateEvent = (id, newData) => (dispatch, getState) => {
    axios.patch(`/events/${id}/`, newData, tokenConfig(getState))
        .then(res => {
            dispatch({type: EDIT_EVENT, payload: res.data})
            dispatch(createMessage({updatedBook: `Updated ${res.data.title}`}))
        })
        .catch(err => createMessage({failed: "Failed to update"}));
}

export const addEvent = (data) => (dispatch, getState) => {
    // send the data directly
    axios.post(`/events/`, data, tokenConfig(getState))
        .then(res => {dispatch({
                type: ADD_EVENT,
                payload: res.data
            })
            dispatch(createMessage({addedBook: `Added ${res.data.title}`}))
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