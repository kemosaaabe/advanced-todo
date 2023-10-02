import {
  TaskActionTypes,
  AddTaskAction,
  EditTaskAction,
  RemoveTaskAction,
  ITask,
  UpdateTaskStatusAction,
  TaskStatus,
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

export const updateSubtasksStatus = (
  parentTask: ITask,
  status: TaskStatus
): UpdateTaskStatusAction => ({
  type: TaskActionTypes.UPDATE_SUBTASKS_STATUS,
  payload: { parent: parentTask, status: status },
});
