import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import SignUp from "../components/auth/SignUp";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: "url(/img/auth/auth.jpg) no-repeat center/cover",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const Auth = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <SignUp />
    </div>
  );
};

export default Auth;
