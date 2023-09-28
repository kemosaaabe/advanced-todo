import { combineReducers } from "redux";
import projectsReducer from "./reducers/projectsReducer";

const rootReducer = combineReducers({ projects: projectsReducer });

export default rootReducer;
