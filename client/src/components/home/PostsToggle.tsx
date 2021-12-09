import * as React from "react";
import {
  Container,
  makeStyles,
  withStyles,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  Theme,
  Select,
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
    margin: "1rem 0",
  },
}));
const PostsToggle = () => {
  const classes = useStyles();
  const [toggle, setToggle] = React.useState(true);
  React.useEffect(() => {
    console.log("You toggles a change and we will now ftech fopr posts");
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
