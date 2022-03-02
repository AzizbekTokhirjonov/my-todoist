import { CREATE_COMMENT_FAILURE } from "../constants/commentConstants";
import { CREATE_SUBTASK_REQUEST, CREATE_SUBTASK_SUCCESS, DELETE_SUBTASK_FAILURE, DELETE_SUBTASK_REQUEST, DELETE_SUBTASK_SUCCESS, FETCH_SUBTASKS_FAILURE, FETCH_SUBTASKS_REQUEST, FETCH_SUBTASKS_SUCCESS, UPDATE_SUBTASK_FAILURE, UPDATE_SUBTASK_REQUEST, UPDATE_SUBTASK_SUCCESS } from "../constants/subtaskConstants";
import { GET_TASKS } from "../constants/taskConstants";
import { handleOpen } from "./actions";
import { getProject, updateProject } from "./projectActions";
const url = process.env.REACT_APP_DEV_URL;

export const getTasks = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/tasks`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: GET_TASKS, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const postTask = (taskObject) => {
  console.log(taskObject);
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(taskObject),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(getTasks());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateTask = (id, taskObject) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(taskObject),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(handleOpen(data));
        dispatch(getTasks());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const postSubTask = (taskId, subTaskObject) => {
  return async (dispatch) => {
    try {
        dispatch({type: CREATE_SUBTASK_REQUEST})
        const response = await fetch(`${url}/tasks/${taskId}/subtasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({...subTaskObject, parentTask: taskId}),
        });
        const data = await response.json();
        dispatch({type: CREATE_SUBTASK_SUCCESS, payload: data})  
        dispatch(getSubTasks(taskId))    
    } catch (err) {
        dispatch({type: CREATE_COMMENT_FAILURE, payload: err})
    }
  };
};

export const getSubTasks = (taskId) => {
  return async (dispatch) => {
    try {
        dispatch({type: FETCH_SUBTASKS_REQUEST})
        const response = await fetch(`${url}/tasks/${taskId}/subtasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        dispatch({type: FETCH_SUBTASKS_SUCCESS, payload: data})      
    } catch (err) {
        dispatch({type: FETCH_SUBTASKS_FAILURE, payload: err})
    }
  };
};

export const deleteSubTask = (taskId, subTaskId) => {
  return async (dispatch) => {
    try {
      dispatch({type: DELETE_SUBTASK_REQUEST})
      const response = await fetch(`${url}/tasks/${taskId}/subtasks/${subTaskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json()
      dispatch({type: DELETE_SUBTASK_SUCCESS, payload: data})
      dispatch(getSubTasks(taskId))
    } catch (err) {
      dispatch({type: DELETE_SUBTASK_FAILURE, payload: err})
    }
  };
};


export const updateSubTask = (taskId, subTaskObject, subtaskId) => {
  return async (dispatch) => {
    try {
        dispatch({type: UPDATE_SUBTASK_REQUEST})
        const response = await fetch(`${url}/tasks/${taskId}/subtasks/${subtaskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({...subTaskObject, parentTask: taskId}),
        });
        const data = await response.json();
        dispatch({type: UPDATE_SUBTASK_SUCCESS, payload: data})  
        dispatch(getSubTasks(taskId))    
    } catch (err) {
        dispatch({type: UPDATE_SUBTASK_FAILURE, payload: err})
    }
  };
};