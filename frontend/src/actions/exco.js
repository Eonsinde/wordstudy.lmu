import axios from "axios";
import { EXCOS_LOADED, EXCOS_LOADING, DELETE_EXCO, EDIT_EXCO, ADD_EXCO } from "./types"
import {createMessage} from './message';


export const getExcos = () => dispatch => {
    dispatch({type: EXCOS_LOADING});

    const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    };

    axios.get(`/excos`, config)
        .then(res => dispatch({
            type: EXCOS_LOADED,
            payload: res.data
        }))
        .catch(err => console.error(err));
}

export const deleteExco = id => (dispatch, getState) => {
    axios.delete(`/excos/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_EXCO,
                excoID: id
            })
            dispatch(createMessage({deletedBook: `Deleted Exco`}))
        })
        .catch(err => createMessage({failed: 'Delete Failed'}));
}

export const updateExco = (id, newData) => (dispatch, getState) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization": `Token ${getState().auth.token}`
        }
    };

    axios.patch(`/excos/${id}/`, newData, config)
        .then(res => {
            dispatch({type: EDIT_EXCO, payload: res.data});
            dispatch(createMessage({updatedBook: `Updated ${res.data.name}`}))
        })
        .catch(err => createMessage({failed: "Failed to update"}));
}

export const addExco = (data) => (dispatch, getState) => {
     // headers
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization": `Token ${getState().auth.token}`
        }
    };

    let excoFormData = new FormData();

    excoFormData.append('name', data.name);
    excoFormData.append('post', data.post);
    excoFormData.append('photo', data.image, data.imageName);

    axios.post(`/excos/`, excoFormData, config)
        .then(res => {dispatch({
                type: ADD_EXCO,
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