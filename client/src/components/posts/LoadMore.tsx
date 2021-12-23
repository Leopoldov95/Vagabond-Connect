// we will only need length of current posts here
// This should only appear if needed
// will always need to execute first BEFORE knowing if there are any posts left...
// may want a special get route for this
// might want to make fetching posts a POST request to handle different filters...
import * as React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  makeStyles,
  Theme,
  CircularProgress,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
    position: "relative",
  },
  overlayLoader: {
    position: "absolute",
    left: 0,
    top: 0,
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
}));
const LoadMore = () => {
  const classes = useStyles();
  const currentPosts = useSelector((state: any) => state.postsReducer);
  const [loading, setLoading] = React.useState(false);
  const [isMore, setIsMore] = React.useState(true); // set to false if no more posts can be loaded

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(currentPosts.length);
    // we will use the length of the current posts and use that to implement the MongoDB skip method
  };
  return (
    <div className={classes.container}>
      {isMore ? (
        <Button
          color="primary"
          variant="outlined"
          disabled={loading}
          onClick={handleClick}
        >
          Load More
        </Button>
      ) : (
        <Typography variant="h6" style={{ color: "gray" }}>
          That's All The Posts!
        </Typography>
      )}

      {loading && (
        <div className={classes.overlayLoader}>
          <CircularProgress
            size={60}
            style={{ position: "absolute", zIndex: 10 }}
          />
        </div>
      )}
    </div>
  );
};

export default LoadMore;
