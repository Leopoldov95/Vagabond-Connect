import * as React from "react";
import { useDispatch } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Divider, Paper, Typography, Button } from "@material-ui/core";
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
    imgContainer: {
      width: "80%",
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
export default function SimpleModal(props: any) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  console.log(user);
  const [uploadedImg, setUploadedImg] = React.useState(null);
  const [clientError, setClientError] = React.useState(null);
  React.useEffect(() => {
    if (clientError) {
      setTimeout(() => {
        setClientError(null);
      }, 2000);
    }
  }, [clientError]);

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

  const handleImgUpload = () => {
    if (!uploadedImg) {
      return setClientError("Please Select an Image!");
    }
    const profile = props.profile.profile;
    // send the request to an action/api
    dispatch(editProfileImg({ uploadedImg, profile, user }));
    // must send profile AND img base6 string AND user.email
    // loading circle and close tool
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
            style={{ width: "100%" }}
            alt={"current"}
          />
        </div>
        <Typography variant="h6">New Image</Typography>
        <div className={classes.imgContainer}>
          <img
            src={uploadedImg ? uploadedImg : "/img/profile/placeholder.png"}
            style={{ width: "100%" }}
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
      </Paper>
    </Modal>
  );
}
