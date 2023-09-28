import {
  ProjectActionTypes,
  AddProjectAction,
  EditProjectAction,
  RemoveProjectAction,
  Project,
} from "../types";

export const addProject = (project: Project): AddProjectAction => ({
  type: ProjectActionTypes.ADD_PROJECT,
  payload: project,
});

export const removeProject = (projectId: string): RemoveProjectAction => ({
  type: ProjectActionTypes.REMOVE_PROJECT,
  payload: projectId,
});

export const editProject = (
  projectId: string,
  title: string
): EditProjectAction => ({
  type: ProjectActionTypes.EDIT_PROJECT,
  payload: { projectId, title },
});
