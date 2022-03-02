import { GET_SECTIONS } from "../constants/projectConstants";
const url = process.env.REACT_APP_DEV_URL;

export const postSection = (sectionObj, project) => {
  return async (dispatch) => {
    const section = sectionObj;
    try {
      const response = await fetch(`${url}/sections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(section),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("check me:", data);
        dispatch(getSections(project._id));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getSections = (projectId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/sections`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const filteredSections = data.filter(
          (section) => section.projectId === projectId
        );
        dispatch({ type: GET_SECTIONS, payload: filteredSections });
        console.log(filteredSections);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const updateSection = (id, sectionObject) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/sections/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sectionObject),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(getSections());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const postSectionTask = (id, taskId, project) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/sections/${id}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ taskId }),
      });
      if (response.ok) {
        dispatch(getSections(project._id));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const postSectionTaskKanban = (id, taskId, project) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/sections/${id}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ taskId }),
      });
      if (response.ok) {
        dispatch(getSections(project._id));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteSectionTask = (id, taskId, project) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/sections/${id}/task`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ taskId }),
      });
      if (response.ok) {
        dispatch(getSections(project._id));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
