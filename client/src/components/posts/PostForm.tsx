// This component will be used to manage post creation and editing
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryNav from "../country/countryNav";
import {
  Container,
  Button,
  makeStyles,
  Modal,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Snackbar,
} from "@material-ui/core";
import { ImageOutlined } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { lightGreen, blueGrey } from "@material-ui/core/colors";
// API actions
import { createPost, updatePost } from "../../actions/posts";

interface Props {
  children: any;
  onClose: any;
  severity: any;
  sx: any;
}
const Alert = React.forwardRef(function Alert(props: Props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: lightGreen[700],
    color: "white",
    position: "fixed",
    bottom: 20,
    right: 20,
    "&:hover": {
      backgroundColor: lightGreen[500],
    },
  },
  container: {
    width: 500,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
  input: {
    display: "none",
  },
  upload: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
  },
  imgButton: {
    backgroundColor: lightGreen[600],
    color: "white",
    "&:hover": {
      backgroundColor: lightGreen[500],
    },
  },
}));
const initialState = {
  title: "",
  description: "",
  selectedFile: null,
  country: "US",
  commentAccess: "Everyone",
};
const Add = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state: any) =>
    props.editPostId
      ? state.postsReducer.find((p) => p._id === props.editPostId)
      : null
  );
  //console.log(post);
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  // const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [formData, setFormData] = React.useState<any>(initialState);
  const [errors, setErrors] = React.useState<any>({});
  React.useEffect(() => {
    if (post)
      setFormData({
        title: post.title,
        description: post.description,
        selectedFile: post.cloudinary_url,
        country: post.country,
        commentAccess: post.commentAccess,
      });
  }, [post, props.open]);

  const handleClose = (event?: any, reason?: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const closePostForm = (e?: any) => {
    e.preventDefault();
    setFormData(initialState);
    props.setEditPostId(null);
    props.setOpen(false);
  };
  const handleChange = (e?: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // handle img file
  const handleCapture = ({ target }: any) => {
    //setFormData({ ...formData, selectedFile: target.files[0] });
    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onloadend = () => {
      setFormData({ ...formData, selectedFile: reader.result });
    };
  };
  const onSubmitValidation = () => {
    const allErrors: any = {};
    if (formData.title.length < 1) {
      allErrors.title = "Must Provide a Title";
    }
    if (formData.description.length < 1) {
      allErrors.description = "Must Provide a Description";
    }
    if (!formData.selectedFile) {
      allErrors.selectedFile = "Must Provide an Image";
    }

    setErrors({
      ...allErrors,
    });
    return allErrors;
  };
  /*   const handleCallback = (data) => {
    setFormData({
      ...formData,
      country: data?.code,
    });
  }; */
  const handleSubmit = async (e: any) => {
    // setOpenAlert(true) -- ned this at some point
    e.preventDefault();
    const isErrors = await onSubmitValidation();
    if (Object.keys(isErrors).length < 1) {
      // create similar action as editing user, add loading bar and close tool on completion
      ///////////////////////////////////
      // Better approach to adding user data to the post information,
      // Get info from here! Then sent to server, will make mass profile avatar change easier as well
      // when user updates profile picture, run a seperate action/reducer that updates all users posts avatar and get data from user local storage
      if (props.editPostId) {
        console.log(formData);
        dispatch(
          updatePost(props.editPostId, {
            ...formData,
            cloudinary_id: post.cloudinary_id,
          })
        );
        return console.log("You want to make changes to an existing post");
      }
      dispatch(
        createPost({
          ...formData,
          profile_cloudinary: user?.profile_cloudinary,
          firstName: user?.firstName,
          lastName: user?.lastName,
        })
      );
      console.log("You want to submit a form");
    }
  };

  return (
    <React.Fragment>
      <Modal open={props.open}>
        <Container className={classes.container}>
          <form className={classes.form} autoComplete="off">
            <div className={classes.item}>
              <TextField
                label="Title"
                id="standard-basic"
                size="small"
                style={{ width: "100%" }}
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                inputProps={{ maxLength: 40 }}
                error={Boolean(errors?.title)}
                helperText={errors?.title}
              ></TextField>
            </div>
            <div className={classes.item}>
              <TextField
                label="Description"
                id="outlined-multiline-static"
                size="small"
                multiline
                variant="outlined"
                required
                value={formData.description}
                rows={4}
                style={{ width: "100%" }}
                name="description"
                onChange={handleChange}
                inputProps={{ maxLength: 400 }}
                error={Boolean(errors?.description)}
                helperText={errors?.description}
              ></TextField>
            </div>
            <div className={classes.upload}>
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
                  variant="contained"
                  startIcon={<ImageOutlined />}
                  className={classes.imgButton}
                  component="span"
                >
                  Upload
                </Button>
              </label>
              {errors?.selectedFile && (
                <Typography style={{ margin: 10, color: "red" }}>
                  {errors?.selectedFile}
                </Typography>
              )}
              {formData.selectedFile ? (
                <Typography component="span" style={{ marginLeft: 10 }}>
                  Image Selected!
                </Typography>
              ) : (
                ""
              )}
            </div>
            <div className={classes.item}>
              <CountryNav
                /* handleCallback={handleCallback}  */ formData={formData}
                setFormData={setFormData}
              />
            </div>
            <div>
              <FormLabel component="legend">Who can comment?</FormLabel>
              <RadioGroup
                onChange={handleChange}
                value={formData.commentAccess}
              >
                <FormControlLabel
                  value="Everyone"
                  control={<Radio size="small" />}
                  label="Everyone"
                  name="commentAccess"
                />
                <FormControlLabel
                  value="Followers"
                  control={<Radio size="small" />}
                  label="Followers"
                  name="commentAccess"
                />
                <FormControlLabel
                  value="Nobody"
                  control={<Radio size="small" />}
                  label="Nobody"
                  name="commentAccess"
                />
              </RadioGroup>
            </div>
            <div>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 20 }}
                onClick={handleSubmit}
              >
                Create
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={closePostForm}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Add;
