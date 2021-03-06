import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import modalReducer from "./reducers/modal";
import { userReducer, userSignUpReducer } from "./reducers/user";
import { taskReducer } from "./reducers/tasks";
import { labelOpsReducer, labelsReducer } from "./reducers/labelsReducer";
import { projectReducer } from "./reducers/projectReducer";
import commentsOpsReducer from "./reducers/commentsReducers";
import { sectionsReducer } from "./reducers/sectionReducers";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialStore = {
  modalState: {
    open: false,
    openTask: {},
    status: "",
  },
  user: {
    authenticated: false,
  },
  tasks: {
    list: [],
  },
  projects: {
    list: [],
    projectFromState: {},
  },
  sections: {
    list: [],
  },
  labelProps: {
    loading: false,
    labels: [],
  },
  labelOps: {
    createLabel: {
      loading: false,
    },
    deleteLabel: {
      loading: false,
    },
    updateLabel: {
      loading: false,
    },
  },

  commentsOps: {
    comments: [],
    fetchComments: {
      loading: false,
    },
    createComment: {
      loading: false,
    },
    updateComment: {
      loading: false,
    },
    deleteComment: {
      loading: false,
    },
  },
};

const bigReducer = combineReducers({
  modalState: modalReducer,
  user: userReducer,
  userSignUp: userSignUpReducer,
  tasks: taskReducer,
  labelProps: labelsReducer,
  labelOps: labelOpsReducer,
  projects: projectReducer,
  commentsOps: commentsOpsReducer,
  sections: sectionsReducer,
});

const configureStore = createStore(
  bigReducer,
  initialStore,
  composeEnhancers(applyMiddleware(thunk))
);

export { configureStore };
