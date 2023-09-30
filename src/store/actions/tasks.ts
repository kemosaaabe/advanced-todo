import {
  TaskActionTypes,
  AddTaskAction,
  EditTaskAction,
  RemoveTaskAction,
  ITask,
} from "../types";

export const addTask = (task: ITask): AddTaskAction => ({
  type: TaskActionTypes.ADD_TASK,
  payload: task,
});

export const removeTask = (taskId: string): RemoveTaskAction => ({
  type: TaskActionTypes.REMOVE_TASK,
  payload: taskId,
});

export const editTask = (task: ITask): EditTaskAction => ({
  type: TaskActionTypes.EDIT_TASK,
  payload: task,
});
