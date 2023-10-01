import { TaskActionTypes, TaskAction, TaskState } from "../types";

const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      projectId: "1",
      title: "Задача",
      description: "Описание",
      created: new Date(),
      workTime: null,
      finished: null,
      subtasks: [],
      files: [],
      priority: "low",
      status: "queue",
    },
  ],
};

const tasksReducer = (state = initialState, action: TaskAction): TaskState => {
  switch (action.type) {
    case TaskActionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case TaskActionTypes.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case TaskActionTypes.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export default tasksReducer;
