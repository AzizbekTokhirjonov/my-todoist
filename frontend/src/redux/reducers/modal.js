import { initialStore } from "../store";
// import { connect } from "react-redux";
import { OPEN_MODAL, REMOVE_MODAL } from "../actions/actions.js";
import { UPDATE_MODAL_TASK } from "../constants/taskConstants";

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
    case UPDATE_MODAL_TASK: {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
}
