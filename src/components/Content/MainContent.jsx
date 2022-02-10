import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Inbox from "./Inbox";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Today from "./Today";
import Upcoming from "./Upcoming";
import Filters from "./FilterScreen/Filters";
const MainContent = ({ open }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <div
        id="main-content"
        className={open ? "ml-auto" : "mx-auto"}
        style={open ? { width: "80%", marginRight: "4rem" } : { width: "85%" }}
      >
        <Router>
          <Route path="/" exact component={Inbox} />
          <Route path="/today" exact component={Today} />
          <Route path="/upcoming" exact component={Upcoming} />
          <Route path="/filters" exact component={Filters} />
        </Router>
      </div>
    </React.Fragment>
  );
};

export default MainContent;
