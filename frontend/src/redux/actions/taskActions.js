import { GET_TASKS } from "../constants/taskConstants";
import { handleOpen } from "./actions";
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
  console.log(taskObject)
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

export const postSection = (sectionObj) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/sections/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sectionObj),
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
