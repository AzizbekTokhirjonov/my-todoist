import React, { useState } from "react";
import Today from "./Content/Today";
import Inbox from "./Content/Inbox";
import Upcoming from "./Content/Upcoming/Upcoming";
import Filters from "./Content/FilterScreen/Filters";
import AppBar from "./Navbar/AppBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Project from "./Content/Projects/Project";
import Kanban from "./Content/Projects/Kanban/Kanban";
import Archived from "./Content/Archived";

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Router>
        <Route path="/">
          <AppBar open={open} setOpen={setOpen} />
        </Route>
        <div
          id="main-content"
          className={open ? "ml-auto" : "mx-auto"}
          style={
            open ? { width: "80%", marginRight: "4rem" } : { width: "85%" }
          }
        >
          <Route path="/" exact component={Inbox} />
          <Route path="/today" exact component={Today} />
          <Route path="/archived" exact component={Archived} />
          <Route path="/upcoming" exact component={Upcoming} />
          <Route path="/filters" exact component={Filters} />
          <Route path="/projects" exact component={Project} />
          <Route path="/projects/kanban/:id" exact component={Kanban} />
        </div>
      </Router>
    </div>
  );
};

export default Home;
