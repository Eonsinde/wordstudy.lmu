import {GET_ERRORS} from '../actions/types';


export const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    };
}