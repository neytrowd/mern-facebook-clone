import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    search: searchReducer
})

export default rootReducer;