import axios from "axios";
import { GET_CATEGORIES } from "./types";



export const getCategories = () => dispatch => {
    axios.get('/genres')
        .then(res => dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        }))
        .catch(err => console.error(err))
}