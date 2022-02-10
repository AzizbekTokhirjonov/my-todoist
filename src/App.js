import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "./components/Navbar/AppBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Today from "./components/Content/Today";
import Inbox from "./components/Content/Inbox";
import Upcoming from "./components/Content/Upcoming";
import Filters from "./components/Content/FilterScreen/Filters";
import MainContent from "./components/Content/MainContent";
function App() {
  const [open, setOpen] = React.useState(false);

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
      {/* <AppBar open={open} setOpen={setOpen} /> */}
      {/* <MainContent open={open} /> */}
    </div>
  );
}

export default App;
