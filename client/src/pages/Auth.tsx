import * as React from "react";
import { makeStyles, Snackbar, Theme } from "@material-ui/core";
import SignUp from "../components/auth/SignUp";
import SnackbarTool from "../components/snackbar/SnackbarTool";
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
      <SnackbarTool />
    </div>
  );
};

export default Auth;
