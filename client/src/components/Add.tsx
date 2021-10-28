import * as React from "react";
import ReactFlagsSelect from "react-flags-select";
import {
  Container,
  Button,
  makeStyles,
  Modal,
  TextField,
  Typography,
  Avatar,
  Divider,
  Card,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Snackbar,
} from "@material-ui/core";
import { ImageOutlined } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { lightGreen, blueGrey } from "@material-ui/core/colors";

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
  cardContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  cardContent: {
    display: "flex",
    marginTop: 10,
  },
  button: {
    backgroundColor: blueGrey[50],
    textTransform: "none",
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: 8,
    width: "100%",
    "&:hover": {
      backgroundColor: blueGrey[100],
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
    marginTop: theme.spacing(2),
  },
  imgButton: {
    backgroundColor: lightGreen[600],
    color: "white",
    "&:hover": {
      backgroundColor: lightGreen[500],
    },
  },
}));
const Add = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({
    title: "",
    description: "",
    selectedFile: null,
    country: "",
    commentAccess: "",
  });

  const handleClose = (event?: any, reason?: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const handleChange = (e?: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCapture = ({ target }: any) => {
    //setFormData.selectedFile(target.files[0]);
    setFormData({ ...formData, selectedFile: target.files[0] });
  };

  return (
    <>
      <Card className={classes.cardContainer}>
        <Typography gutterBottom variant="h6">
          Post Something
        </Typography>
        <Divider />
        <div className={classes.cardContent}>
          <Avatar
            alt="post_owner_icon"
            src="https://melmagazine.com/wp-content/uploads/2021/01/66f-1.jpg"
            style={{ marginRight: 10 }}
          />
          <Button
            variant="contained"
            className={classes.button}
            disableElevation
            onClick={() => setOpen(true)}
          >
            Share Your Adventures...
          </Button>
        </div>
      </Card>
      <Modal open={open}>
        <Container className={classes.container}>
          <form className={classes.form} autoComplete="off">
            <div className={classes.item}>
              <TextField
                label="Title"
                id="standard-basic"
                size="small"
                style={{ width: "100%" }}
                name="title"
                onChange={handleChange}
              ></TextField>
            </div>
            <div className={classes.item}>
              <TextField
                label="Description"
                id="outlined-multiline-static"
                size="small"
                multiline
                variant="outlined"
                rows={4}
                style={{ width: "100%" }}
                name="description"
                onChange={handleChange}
              ></TextField>
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
                {formData.selectedFile ? (
                  <Typography component="span" style={{ marginLeft: 10 }}>
                    {formData.selectedFile!.name}
                  </Typography>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={classes.item}>
              <Typography>Location:</Typography>
              <ReactFlagsSelect
                selected={formData.country}
                //onSelect={(code) => setSelected(code)}
                onSelect={(code) => setFormData({ ...formData, country: code })}
              />
              {/*  <TextField select label="Visibility" value="Public">
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
                <MenuItem value="Unlisted">Unlisted</MenuItem>
              </TextField> */}
            </div>
            <div>
              <FormLabel component="legend">Who can comment?</FormLabel>
              <RadioGroup onChange={handleChange}>
                <FormControlLabel
                  value="Everyone"
                  control={<Radio size="small" />}
                  label="Everyone"
                  name="commentAccess"
                />
                <FormControlLabel
                  value="Friends"
                  control={<Radio size="small" />}
                  label="Friends"
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
                onClick={() => setOpenAlert(true)}
              >
                Create
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(false)}
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
    </>
  );
};

export default Add;
