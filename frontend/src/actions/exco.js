import axios from "axios";
import { EXCOS_LOADED, EXCOS_LOADING } from "./types"


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