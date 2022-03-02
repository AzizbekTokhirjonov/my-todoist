import {
  ADD_PROJECT_SECTIONS,
  GET_PROJECTS,
  REMOVE_PROJECT_SECTIONS,
  ADD_PROJECT,
  REMOVE_PROJECT,
  GET_SECTIONS,
} from "../constants/projectConstants.js";
import { v4 as uuid } from "uuid";

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

export const addProjectToState = (project) => {
  return async (dispatch) => {
    try {
      const columnsData = {};
      const sections = project.sections;
      for (let section of sections) {
        columnsData[section._id] = section;
      }
      dispatch({ type: REMOVE_PROJECT });
      dispatch({ type: REMOVE_PROJECT_SECTIONS });
      dispatch({ type: ADD_PROJECT, payload: project });
      dispatch({ type: ADD_PROJECT_SECTIONS, payload: columnsData });
    } catch (error) {
      console.log(error);
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
