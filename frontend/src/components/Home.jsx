import React, { useState } from "react";
import Today from "./Content/Today";
import Inbox from "./Content/Inbox";
import Upcoming from "./Content/Upcoming/Upcoming";
import Filters from "./Content/FilterScreen/Filters";
import AppBar from "./Navbar/AppBar";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
          <Route path="/upcoming" exact component={Upcoming} />
          <Route path="/filters" exact component={Filters} />
        </div>
      </Router>
    </div>
  );
};

export default Home;