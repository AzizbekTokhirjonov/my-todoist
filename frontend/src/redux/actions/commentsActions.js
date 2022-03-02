import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, UPDATE_COMMENT_FAILURE, UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS } from "../constants/commentConstants";

import baseUrl from "../API/baseUrl";

export const postComment = (taskId, commentObj) => {
  
    return async (dispatch) => {
      try {
        dispatch({type: CREATE_COMMENT_REQUEST})
        const response = await fetch(`${baseUrl}/tasks/${taskId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(commentObj),
        });
            const data = await response.json();
            dispatch({type: CREATE_COMMENT_SUCCESS, payload: data})
            dispatch((fetchCommentsAction(taskId)))
      } catch (err) {
        console.log(`ERROR RECEIVED ON CREATECOMMENT ACTION: ${err}`);     // <- TO BE DELETED IN PROD
        dispatch({type: CREATE_COMMENT_FAILURE, payload: err})
      }
    };
  };
  

  export const fetchCommentsAction = (taskId) => {
  
    return async (dispatch) => {
      try {
        dispatch({type: FETCH_COMMENTS_REQUEST})
        const response = await fetch(`${baseUrl}/tasks/${taskId}/comments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
          const data = await response.json();
          dispatch({type: FETCH_COMMENTS_SUCCESS, payload: data})
      } catch (err) {
        
        console.log(`ERROR RECEIVED ON FETCHCOMMENTS ACTION: ${err}`);     // <- TO BE DELETED IN PROD
        dispatch({type: FETCH_COMMENTS_FAILURE, payload: err})
      }
    };
  };



  
export const updateComment = (taskId, commentId, commentObj) => {
  return async (dispatch) => {
    try {
      dispatch({type: UPDATE_COMMENT_REQUEST})
      const response = await fetch(`${baseUrl}/tasks/${taskId}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(commentObj),
      });
          const data = await response.json();
          dispatch({type: UPDATE_COMMENT_SUCCESS, payload: data})
          dispatch((fetchCommentsAction(taskId)))
    } catch (err) {
      console.log(`ERROR RECEIVED ON UPDATECOMMENT ACTION: ${err}`);     // <- TO BE DELETED IN PROD
      dispatch({type: UPDATE_COMMENT_FAILURE, payload: err})
    }
  };
};


export const deleteComment = (taskId, commentId) => {
  return async (dispatch) => {
    try {
      dispatch({type: DELETE_COMMENT_REQUEST})
      const response = await fetch(`${baseUrl}/tasks/${taskId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
        const data = await response.json();
        dispatch({type: DELETE_COMMENT_SUCCESS, payload: data})  
        dispatch((fetchCommentsAction(taskId)))
    } catch (err) {
      console.log(`ERROR RECEIVED ON DELETECOMMENT ACTION: ${err}`);     // <- TO BE DELETED IN PROD
      dispatch({type: DELETE_COMMENT_FAILURE, payload: err})
    }
  };
};
