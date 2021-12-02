import * as React from "react";
import { useDispatch } from "react-redux";
import PostForm from "./PostForm";
import {
  Button,
  makeStyles,
  Typography,
  Avatar,
  Divider,
  Card,
} from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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
}));
const Add = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  return (
    <React.Fragment>
      <Card className={classes.cardContainer}>
        <Typography gutterBottom variant="h6">
          Post Something
        </Typography>
        <Divider />
        <div className={classes.cardContent}>
          <Avatar
            alt="post_owner_icon"
            src={user ? user?.profile_cloudinary : "img/auth/default.jpeg"}
            style={{ marginRight: 10 }}
          />
          <Button
            variant="contained"
            className={classes.button}
            disableElevation
            onClick={() => props.setOpen(true)}
          >
            Share Your Adventures...
          </Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Add;
