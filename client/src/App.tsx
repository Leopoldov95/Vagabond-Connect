import io from "socket.io-client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./pages/Auth";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Friends from "./pages/Friends";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "./loader.scss";
import Navbar from "./components/Navbar";
import { checkConnection } from "./actions/posts";

const SERVER_URL = "https://drab-gray-hippo-slip.cyclic.app/";
// Socket.io server path
const App = () => {
  const user = JSON.parse(localStorage.getItem("vagabond_connect_profile"));
  const authUser = useSelector((state: any) => state.userAuthReducer);
  const dispatch = useDispatch();
  const socket = useSelector((state: any) => state.socketReducer);
  const status = useSelector((state: any) => state.connectionReducer);

  const [loading, setLoading] = React.useState(true);
  // set the socket on page load, using redux to set it as a global state
  React.useEffect(() => {
    dispatch(checkConnection());
  }, []);

  React.useEffect(() => {
    if (status === 200 && loading) {
      setLoading(false);
    }
  }, [status]);

  // if an authorized user is active, send there information to the server
  React.useEffect(() => {
    if (user && !socket) {
      const tmp = {};
      tmp["initSocket"] = io(SERVER_URL);
      tmp["id"] = user?.result._id;
      dispatch({
        type: "SET_SOCKET",
        payload: tmp,
      });
    }
  }, [authUser, user]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/resources" exact component={Resources} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/friends" exact component={Friends} />
          <Route path="/messages/:id?" exact component={Messages} />
          <Route path="/settings/:id" exact component={Settings} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Router>
      {loading && (
        <div className="page-load">
          <div className="loading">
            <div className="loading__square"></div>
            <div className="loading__square"></div>
            <div className="loading__square"></div>
            <div className="loading__square"></div>
            <div className="loading__square"></div>
            <div className="loading__square"></div>
            <div className="loading__square"></div>
          </div>
          <span>Waiting for Server to wake up...</span>
        </div>
      )}
    </div>
  );
};

export default App;
