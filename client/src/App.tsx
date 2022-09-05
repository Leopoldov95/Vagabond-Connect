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
import Navbar from "./components/Navbar";

const SERVER_URL = "http://localhost:5000";
// Socket.io server path
//const socket = io("http://localhost:5000"); // creates a Socket object which contains important properties we will need to use
const App = () => {
  const user = JSON.parse(localStorage.getItem("vagabond_connect_profile"));
  const dispatch = useDispatch();
  // const [socket, setSocket] = React.useState<any>(null);
  const socket = useSelector((state: any) => state.socketReducer);

  // set the socket on page load, using redux to set it as a global state
  React.useEffect(() => {
    dispatch({ type: "SET_SOCKET", payload: io(SERVER_URL) });
  }, []);

  // if an authorized user is active, send there information to the server
  React.useEffect(() => {
    if (user && socket) {
      console.log("event emitted! New user added to Socket server");
      socket?.emit("newUser", user?.result._id);
    }
  }, [socket, user]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/resources" exact component={Resources} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/friends" exact component={Friends} />
          <Route path="/messages/:id?" component={Messages} />
          <Route path="/settings/:id" exact component={Settings} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
