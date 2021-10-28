import React from "react";
import Auth from "./pages/auth/Auth";
import Resources from "./pages/main/Resources";
import Profile from "./pages/main/Profile";
import Main from "./pages/main/Main";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/resources" exact component={Resources} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </div>
  );
};

export default App;
