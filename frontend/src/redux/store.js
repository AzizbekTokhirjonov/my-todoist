import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import modalReducer from "./reducers/modal";
import { userReducer, userSignUpReducer } from "./reducers/user";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialStore = {
  modalState: {
    open: false,
    openTask: {},
  },
  user: {
    authenticated: false,
  },
};

const bigReducer = combineReducers({
  modalState: modalReducer,
  user: userReducer,
  userSignUp: userSignUpReducer
});

const configureStore = createStore(
  bigReducer,
  initialStore,
  composeEnhancers(applyMiddleware(thunk))
);

export { configureStore };
