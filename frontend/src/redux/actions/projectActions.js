import { GET_PROJECTS } from "../constants/projectConstants.js";
const url = process.env.REACT_APP_DEV_URL;
export const postProject = (projectObj) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/projects/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(projectObj),
      });
      if (response.ok) {
        console.log("projectObj:", projectObj);
        const data = await response.json();
        dispatch(getProjects());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/projects`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: GET_PROJECTS, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProject = (id, projectObject) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(projectObject),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(getProjects());
      }
    } catch (err) {
      console.log(err);
    }
  };
};
