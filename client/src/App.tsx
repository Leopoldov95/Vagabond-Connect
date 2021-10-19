import React from "react";
import Auth from "./pages/auth/Auth";
import Main from "./pages/main/Main";
import { Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </div>
  );
};

export default App;
