import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserLoginLayout from "./components/User/UserLoginLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Route path="/login" exact component={UserLoginLayout} />
      <ProtectedRoute exact path="/">
        <Home />
      </ProtectedRoute>
    </Router>
  );
}

export default App;
