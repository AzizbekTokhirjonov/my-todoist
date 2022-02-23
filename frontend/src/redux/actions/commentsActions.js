import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS } from "../constants/commentConstants";

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
  
        if (response.ok) {
            const data = await response.json();
            dispatch({type: CREATE_COMMENT_SUCCESS, payload: data})
            dispatch((fetchCommentsAction(taskId)))
        } else {
            dispatch({type: CREATE_COMMENT_FAILURE, payload: 'Something went wrong on server response'})
        }
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

        // console.log(response)
  
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          dispatch({type: FETCH_COMMENTS_SUCCESS, payload: data})
        } else {
          dispatch({type: FETCH_COMMENTS_FAILURE, payload: 'Something went wrog while obtaining response from server'})

        }
      } catch (err) {
        
        console.log(`ERROR RECEIVED ON FETCHCOMMENTS ACTION: ${err}`);     // <- TO BE DELETED IN PROD
        dispatch({type: FETCH_COMMENTS_FAILURE, payload: err})
      }
    };
  };

