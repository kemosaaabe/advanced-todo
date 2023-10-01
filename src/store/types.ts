// Project

export enum ProjectActionTypes {
  ADD_PROJECT = "ADD_PROJECT",
  REMOVE_PROJECT = "REMOVE_PROJECT",
  EDIT_PROJECT = "EDIT_PROJECT",
}

export interface IProject {
  id: string;
  title: string;
}

export interface AddProjectAction {
  type: ProjectActionTypes.ADD_PROJECT;
  payload: IProject;
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
  projects: IProject[];
}

// Task

export enum TaskActionTypes {
  ADD_TASK = "ADD_TASK",
  REMOVE_TASK = "REMOVE_TASK",
  EDIT_TASK = "EDIT_TASK",
}

// Добавить еще вложенные файлы

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "queue" | "dev" | "done";

export interface ITask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  created: Date;
  workTime: Date | null;
  finished: Date | null;
  priority: TaskPriority | null;
  status: TaskStatus;
  files: string[];
  subtasks?: ITask[];
}

export interface AddTaskAction {
  type: TaskActionTypes.ADD_TASK;
  payload: ITask;
}

export interface RemoveTaskAction {
  type: TaskActionTypes.REMOVE_TASK;
  payload: string;
}

export interface EditTaskAction {
  type: TaskActionTypes.EDIT_TASK;
  payload: ITask;
}

export type TaskAction = AddTaskAction | RemoveTaskAction | EditTaskAction;

export interface TaskState {
  tasks: ITask[];
}
