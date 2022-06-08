import React from "react";
import Auth from "./pages/Auth";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Friends from "./pages/Friends";
import Settings from "./pages/Settings";
//import Messages from "./pages/Messages";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/resources" exact component={Resources} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/friends" exact component={Friends} />
          {/* <Route path="/messages/:id?" exact component={Messages} /> */}
          <Route path="/settings/:id" exact component={Settings} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
