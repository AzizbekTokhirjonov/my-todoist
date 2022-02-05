import { initialStore } from "../store";
import { connect } from "react-redux";

export default function modalReducer(state = initialStore.modalState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        open: true,
      };
    }
  }
}
