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

  const createNewUser = async (formData: any) => {
    try {
      const serverData = new FormData();
      console.log(formData.selectedFile);
      serverData.append("image", formData?.selectedFile);
      const res = await fetch("/api/users/addUser", {
        method: "POST",
        //body: JSON.stringify({ formData }),
        body: serverData,
        headers: {
          //"Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();
      console.log(data);

      // to prevvent back button push
      // router.replace
      //router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.container}>
      <SignUp submitFormData={createNewUser} />
    </div>
  );
};

export default Auth;
