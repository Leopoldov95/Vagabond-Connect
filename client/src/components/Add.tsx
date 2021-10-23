import * as React from "react";
import ReactFlagsSelect from "react-flags-select";
import {
  Container,
  Fab,
  Button,
  makeStyles,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
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
import { Add as AddIcon, ImageOutlined } from "@material-ui/icons";
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
  imgButton: {
    backgroundColor: lightGreen[600],
    color: "white",
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: lightGreen[500],
    },
  },
}));
function Add() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const handleClose = (event?: any, reason?: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <>
      {/* <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip> */}
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
              ></TextField>
              <input
                type="file"
                hidden
                id="icon-button-file"
                accept="image/*"
              />
              <label htmlFor="icon-button-file">
                <Button
                  variant="contained"
                  startIcon={<ImageOutlined />}
                  className={classes.imgButton}
                >
                  Upload Image
                </Button>
              </label>
            </div>
            <div className={classes.item}>
              <Typography>Location:</Typography>
              <ReactFlagsSelect
                selected={selected}
                onSelect={(code) => setSelected(code)}
              />
              {/*  <TextField select label="Visibility" value="Public">
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
                <MenuItem value="Unlisted">Unlisted</MenuItem>
              </TextField> */}
            </div>
            <div>
              <FormLabel component="legend">Who can comment?</FormLabel>
              <RadioGroup>
                <FormControlLabel
                  value="Everyone"
                  control={<Radio size="small" />}
                  label="Everyone"
                />
                <FormControlLabel
                  value="Friends"
                  control={<Radio size="small" />}
                  label="Friends"
                />
                <FormControlLabel
                  value="Nobody"
                  control={<Radio size="small" />}
                  label="Nobody"
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
}

export default Add;
