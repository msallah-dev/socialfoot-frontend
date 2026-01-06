import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import errorReducer from "./error.reducer";
import postReducer from "./post.reducer";

export default combineReducers({
    userReducer,
    postReducer,
    errorReducer
});