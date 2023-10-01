import { CommentActionTypes, CommentAction, CommentState } from "../types";

const initialState: CommentState = {
  comments: [],
};

const commentsReducer = (
  state = initialState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case CommentActionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case CommentActionTypes.REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };

    case CommentActionTypes.EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id
            ? { ...comment, ...action.payload }
            : comment
        ),
      };
    default:
      return state;
  }
};

export default commentsReducer;
