import { combineReducers } from 'redux';

import auth from './auth';
import error from './error';
import message from './message';
import book from './book';
import category from './category';
import exco from './exco';



let rootReducer = combineReducers({
    auth,
    error,
    message,
    book,
    category,
    exco
});

export default rootReducer;