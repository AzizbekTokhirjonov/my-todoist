import { GET_SECTIONS } from "../constants/projectConstants";
import { initialStore } from "../store";

export const sectionsReducer = (state = initialStore.sections, action) => {
  switch (action.type) {
    case GET_SECTIONS: {
      return {
        ...state,
        list: action.payload,
      };
    }
    default:
      return state;
  }
};
