import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import modalReducer from "./reducers/modal";
import { userReducer, userSignUpReducer } from "./reducers/user";
import { taskReducer } from "./reducers/tasks";
import { labelOpsReducer, labelsReducer } from "./reducers/labelsReducer";
import { projectReducer } from "./reducers/projectReducer";
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
};

const bigReducer = combineReducers({
  modalState: modalReducer,
  user: userReducer,
  userSignUp: userSignUpReducer,
  tasks: taskReducer,
  labelProps: labelsReducer,
  labelOps: labelOpsReducer,
  projects: projectReducer,
});

const configureStore = createStore(
  bigReducer,
  initialStore,
  composeEnhancers(applyMiddleware(thunk))
);

export { configureStore };
