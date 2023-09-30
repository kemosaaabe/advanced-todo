import { ProjectActionTypes, ProjectAction, ProjectState } from "../types";

const initialState: ProjectState = {
  projects: [{ id: "1", title: "Проект" }],
};

const projectsReducer = (
  state = initialState,
  action: ProjectAction
): ProjectState => {
  switch (action.type) {
    case ProjectActionTypes.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case ProjectActionTypes.EDIT_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? { ...project, title: action.payload.title }
            : project
        ),
      };
    case ProjectActionTypes.REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default projectsReducer;
