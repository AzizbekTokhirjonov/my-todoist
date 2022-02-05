import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import {configureStore} from "./redux/store.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

ReactDOM.render(
  <Provider store={configureStore}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  ,document.getElementById("root"));
