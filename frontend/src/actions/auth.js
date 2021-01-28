import axios from 'axios';
import {createMessage} from './message';
import {returnErrors} from './error';

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';



export const loadUser = () => (dispatch, getState) => {
    // load user
    dispatch({ type: USER_LOADING });


    axios.get('/accounts/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch({ type: AUTH_ERROR });
        })
} 

export const login = ({username, password}) => dispatch => {
     // request body
     const credentials = JSON.stringify({
        username,
        password
    });

    // headers
    const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    };

    axios.post('/accounts/auth/login', credentials, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage({ loggedIn: `Welcome ${res.data.user.username}`}));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: LOGIN_FAIL});
        })
}


export const register = (data) => (dispatch) => {
    // stringify data here

    // headers
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
            // multipart/form-data
        }
    };

    let { interests } = data; // destructing
    let formatted_interests = interests.map(interest => interest.key);

    const registerFormData = new FormData();
    
    registerFormData.append('username', data.username);
    registerFormData.append('password', data.password);
    registerFormData.append('email', data.email);
    registerFormData.append('first_name', data.first_name);
    registerFormData.append('last_name', data.last_name);

    if (data.image !== null)
        registerFormData.append('actual-img', data.image, data.image.name);
    else
        registerFormData.append('actual-img', null);
    registerFormData.append('profile', JSON.stringify({
        image: '', 
        phone_no: data.phone_no,
        city: data.city,
        state: data.state,
        address: data.address,
        interests: [...formatted_interests]
    }));

    axios.post('/accounts/auth/register', registerFormData, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage({ registered: `Welcome ${res.data.user.username}`}));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: REGISTER_FAIL});
        });
}

export const updateProfile = (data) => (dispatch, getState) => {

}

export const logout = () => (dispatch, getState) => {
    axios.post('/accounts/auth/logout', null, tokenConfig(getState))
    .then(res => dispatch({
        type: LOGOUT_SUCCESS
    }))
    .catch(e => {
        dispatch(returnErrors(e.response.data, e.response.status));
        dispatch({ type: LOGOUT_FAIL });
    })
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