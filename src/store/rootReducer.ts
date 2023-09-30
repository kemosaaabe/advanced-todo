import { combineReducers } from "redux";

import projectsReducer from "./reducers/projectsReducer";
import tasksReducer from "./reducers/tasksReducer";

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

export default rootReducer;
