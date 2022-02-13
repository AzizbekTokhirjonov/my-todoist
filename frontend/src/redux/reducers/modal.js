import { initialStore } from "../store";
// import { connect } from "react-redux";
import { OPEN_MODAL, REMOVE_MODAL } from "../actions.js";

export default function modalReducer(state = initialStore.modalState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        open: action.payload.open,
        openTask: action.payload.openTask,
      };
    }
    case REMOVE_MODAL: {
      return {
        ...state,
        open: action.payload.open,
        openTask: {},
      };
    }
    default:
      return state;
  }
}
