import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialStore = {
  modalState: {
    open: false,
  },
};

const bigReducer = combineReducers({
  modalState: modalReducer,
});

const configureStore = createStore(
  initialStore,
  composeEnhancers(applyMiddleware(thunk))
);

export { configureStore };
