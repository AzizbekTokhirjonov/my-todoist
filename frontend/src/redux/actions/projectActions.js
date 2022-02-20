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
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
