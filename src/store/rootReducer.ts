import { combineReducers } from "redux";

import projectsReducer from "./reducers/projectsReducer";
import tasksReducer from "./reducers/tasksReducer";
import commentsReducer from "./reducers/commentsReducer";

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  comments: commentsReducer,
});

export default rootReducer;
