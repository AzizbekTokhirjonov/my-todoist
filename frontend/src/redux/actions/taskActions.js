import { GET_TASKS } from "../constants/taskConstants";
import { handleOpen } from "./actions";
import { getProject, updateProject } from "./projectActions";
import { getSections, postSectionTask, updateSection } from "./sectionActions";
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

export const postTask = (taskObject, section, project) => {
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

        dispatch(getTasks());
        if (section) {
          dispatch(postSectionTask(section._id, data._id, project));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateTask = (id, taskObject, project) => {
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
        // dispatch(handleOpen(data));
        dispatch(getTasks());
        if (project) {
          dispatch(getSections(project._id));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const postSubTask = (taskId, subTaskObject) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/tasks/${taskId}/subtasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(subTaskObject),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(getTasks());
        // dispatch(handleOpen(taskId))
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteSubTask = (taskId, subTaskId) => {
  return async (dispatch) => {
    try {
      await fetch(`${url}/tasks/${taskId}/subtasks/${subTaskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      dispatch(getTasks());
    } catch (err) {
      console.log(err);
    }
  };
};
