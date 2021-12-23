import * as React from "react";
import {
  Container,
  makeStyles,
  withStyles,
  Typography,
  Switch,
  FormControlLabel,
  Theme,
} from "@material-ui/core";
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
const PostsToggle = ({ toggle, setToggle }) => {
  const classes = useStyles();

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
