import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Theme,
  createStyles,
  Modal,
  Divider,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { API_ERROR } from "../../constants/actionTypes";
import { ImageOutlined } from "@material-ui/icons";
import { lightGreen } from "@material-ui/core/colors";
import { editProfileImg } from "../../actions/users";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      width: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    overlayLoader: {
      position: "absolute",
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      "&::before": {
        content: '""',
        backgroundColor: "white",
        opacity: 0.6,
        height: "100%",
        width: "100%",
      },
    },
    imgContainer: {
      width: "80%",
      maxHeight: 200,
      overflow: "hidden",
    },
    input: {
      display: "none",
    },
    actionContainer: {
      display: "flex",
      width: "100%",
      marginTop: theme.spacing(2),
      justifyContent: "start",
    },
    backgroundButton: {
      backgroundColor: lightGreen[600],
      marginTop: theme.spacing(1),
      color: "white",
      "&:hover": {
        backgroundColor: lightGreen[400],
      },
    },
  })
);
const ProfileImgHandler = (props: any) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  //console.log(authReducer?.authData);
  const [uploadedImg, setUploadedImg] = React.useState(null);
  const [clientError, setClientError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  // this state will just track changes to the API user state
  const API_USER = useSelector((state: any) => state.userAuthReducer)?.authData
    ?.result;
  const API_ERRORS = useSelector((state: any) => state.apiErrors);
  React.useEffect(() => {
    if (API_ERRORS) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: API_ERROR, payload: null });
      }, 3000);
    }
  }, [API_ERRORS]);
  React.useEffect(() => {
    if (clientError) {
      setTimeout(() => {
        setClientError(null);
      }, 3000);
    }
  }, [clientError]);

  // Test

  // we will use this to close the img tool AFTER the changes have been made
  React.useEffect(() => {
    // just to be safe -- trigger it here - false
    setLoading(false);
    props.setOpen(false);
  }, [API_USER]);

  const closeTool = () => {
    setUploadedImg(null);
    props.setOpen(false);
  };
  const handleCapture = ({ target }: any) => {
    setClientError(null);
    if (target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onloadend = () => {
        setUploadedImg(reader.result);
      };
    }
  };

  const handleImgUpload = async () => {
    if (!uploadedImg) {
      return setClientError("Please Select an Image!");
    }
    // trigger api error here -- false
    setLoading(true);
    const profile = props.profile.profile;

    // send the request to an action/api
    dispatch(editProfileImg({ uploadedImg, profile, user }));

    //dispatch(editProfileImg({ testImg, profile, user }));
  };
  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper className={classes.container}>
        <Typography gutterBottom variant="h5">
          IMG Edit
        </Typography>
        <Divider
          style={{ backgroundColor: lightGreen[200], marginBottom: 10 }}
        />
        <Typography gutterBottom variant="h6">
          Current Image
        </Typography>
        <div className={classes.imgContainer}>
          <img
            src={props?.profile?.url}
            style={{ width: "100%", height: "100%" }}
            alt={"current"}
          />
        </div>
        <Typography variant="h6">New Image</Typography>
        <div className={classes.imgContainer}>
          <img
            src={uploadedImg ? uploadedImg : "/img/profile/placeholder.png"}
            style={{ width: "100%", height: "100%" }}
            alt={"new"}
          />
        </div>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleCapture}
        />
        <label htmlFor="contained-button-file">
          <Button
            startIcon={<ImageOutlined />}
            variant="contained"
            component="span"
            className={classes.backgroundButton}
          >
            Select
          </Button>
        </label>
        {clientError && (
          <Typography
            color="secondary"
            style={{ textAlign: "center", marginTop: 10 }}
          >
            {clientError}
          </Typography>
        )}
        {API_ERRORS && (
          <Typography
            style={{ textAlign: "center", color: "red", marginTop: "8px" }}
          >
            {API_ERRORS}
          </Typography>
        )}
        <div className={classes.actionContainer}>
          <Button
            style={{ margin: 10 }}
            variant="outlined"
            color="primary"
            onClick={handleImgUpload}
          >
            Save
          </Button>
          <Button
            style={{ margin: 10 }}
            variant="outlined"
            color="secondary"
            onClick={closeTool}
          >
            Cancel
          </Button>
        </div>
        {loading && (
          <div className={classes.overlayLoader}>
            <CircularProgress
              size={60}
              style={{ position: "absolute", zIndex: 10 }}
            />
          </div>
        )}
      </Paper>
    </Modal>
  );
};

export default ProfileImgHandler;
