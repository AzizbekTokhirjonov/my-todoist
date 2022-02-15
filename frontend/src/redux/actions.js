export const OPEN_MODAL = "OPEN_MODAL";
export const REMOVE_MODAL = "REMOVE_MODAL";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const handleOpen = (task) => {
  return {
    type: OPEN_MODAL,
    payload: {
      open: true,
      openTask: task,
    },
  };
};
export const handleCLose = () => {
  return {
    type: REMOVE_MODAL,
    payload: {
      open: false,
      openTask: {},
    },
  };
};

export const addUserDetails = (firstName, lastName, email, title, imgUrl) => ({
  type: LOGIN_USER,
  payload: {
    firstName,
    lastName,
    email,
    title,
    imgUrl,
  },
});
