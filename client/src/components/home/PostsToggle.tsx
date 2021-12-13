import * as React from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  makeStyles,
  withStyles,
  Typography,
  Switch,
  FormControlLabel,
  Theme,
} from "@material-ui/core";
import { getAllPosts } from "../../actions/posts";
import { lightGreen } from "@material-ui/core/colors";
const GreenSwitch = withStyles({
  switchBase: {
    color: lightGreen[300],
    "&$checked": {
      color: lightGreen[500],
    },
    "&$checked + $track": {
      backgroundColor: lightGreen[500],
    },
  },
  checked: {},
  track: {
    backgroundColor: lightGreen[400],
  },
})(Switch);
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
}));
const PostsToggle = () => {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [toggle, setToggle] = React.useState(true);
  const firstUpdate = React.useRef(true);
  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (user) {
      toggle ? dispatch(getAllPosts()) : dispatch(getAllPosts(user._id));
    }
  }, [toggle]);
  const handleChange = (event) => {
    setToggle(event.target.checked);
  };
  return (
    <Container className={classes.container}>
      <div>
        <Typography>Posts To Show</Typography>
      </div>
      <div>
        <FormControlLabel
          control={<GreenSwitch checked={toggle} onChange={handleChange} />}
          label={toggle ? "All Posts" : "Following"}
        />
      </div>
    </Container>
  );
};

export default PostsToggle;
