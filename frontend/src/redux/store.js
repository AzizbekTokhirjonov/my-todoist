import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import modalReducer from "./reducers/modal";
import { userReducer, userSignUpReducer } from "./reducers/user";
import { taskReducer } from "./reducers/tasks";
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
};

const bigReducer = combineReducers({
  modalState: modalReducer,
  user: userReducer,
  userSignUp: userSignUpReducer,
  tasks: taskReducer,
});

const configureStore = createStore(
  bigReducer,
  initialStore,
  composeEnhancers(applyMiddleware(thunk))
);

export { configureStore };
