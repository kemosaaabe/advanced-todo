export enum ProjectActionTypes {
  ADD_PROJECT = "ADD_PROJECT",
  REMOVE_PROJECT = "REMOVE_PROJECT",
  EDIT_PROJECT = "EDIT_PROJECT",
}

export interface Project {
  id: string;
  title: string;
}

export interface AddProjectAction {
  type: ProjectActionTypes.ADD_PROJECT;
  payload: Project;
}

export interface RemoveProjectAction {
  type: ProjectActionTypes.REMOVE_PROJECT;
  payload: string;
}

export interface EditProjectAction {
  type: ProjectActionTypes.EDIT_PROJECT;
  payload: { projectId: string; title: string };
}

export type ProjectAction =
  | AddProjectAction
  | RemoveProjectAction
  | EditProjectAction;

export interface ProjectState {
  projects: Project[];
}
