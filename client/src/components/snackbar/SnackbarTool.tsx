import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { SNACKBAR_CLEAR } from "../../constants/actionTypes";
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarTool = () => {
  const dispatch = useDispatch();
  const snackbarMessage = useSelector((state: any) => state.snackbar);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (snackbarMessage?.message?.length > 0) {
      setOpen(true);
    }
  }, [snackbarMessage]);
  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: SNACKBAR_CLEAR });
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackbarMessage?.type}>
        {snackbarMessage?.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarTool;
