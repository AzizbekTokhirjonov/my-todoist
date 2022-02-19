import { GET_TASKS } from "../constants/taskConstants";
import { initialStore } from "../store";

export const taskReducer = (state = initialStore.tasks, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return {
        list: action.payload,
      };
    }
    default:
      return state;
  }
};
