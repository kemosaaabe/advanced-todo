import {
  CommentActionTypes,
  AddCommentAction,
  RemoveCommentAction,
  IComment,
  EditCommentAction,
} from "../types";

export const addComment = (comment: IComment): AddCommentAction => ({
  type: CommentActionTypes.ADD_COMMENT,
  payload: comment,
});

export const removeComment = (commentId: string): RemoveCommentAction => ({
  type: CommentActionTypes.REMOVE_COMMENT,
  payload: commentId,
});

export const editComment = (comment: IComment): EditCommentAction => ({
  type: CommentActionTypes.EDIT_COMMENT,
  payload: comment,
});
