import {
  Container,
  makeStyles,
  Theme,
  Avatar,
  Typography,
  Divider,
  Link,
} from "@material-ui/core";
import { Room } from "@material-ui/icons";
import { lightGreen } from "@material-ui/core/colors";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    position: "sticky",
    top: theme.spacing(10),
    padding: 0,
    boxShadow:
      "0px 2px 1px -1px rgb(0, 0, 0, 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: lightGreen[500],
    color: "white",
    alignItems: "center",
    paddingTop: theme.spacing(3),
    justifyContent: "center",
  },
  lgIcon: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(3),
  },
  bioText: {
    display: "flex",
    alignItems: "center",
    color: "#555",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  link: {
    paddingBottom: theme.spacing(3),
  },
}));
const LeftProfile = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <div className={classes.profile}>
        <Avatar
          className={classes.lgIcon}
          alt="account_icon"
          src="https://melmagazine.com/wp-content/uploads/2021/01/66f-1.jpg"
        />
        <Typography gutterBottom variant="h6">
          Giga Chad
        </Typography>
        <Typography gutterBottom className={classes.bioText}>
          <Room /> Sydney, Australia
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.profileInfo}>
        <Typography gutterBottom className={classes.bioText}>
          Following
        </Typography>
        <Typography gutterBottom variant="h6">
          69
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.profileInfo}>
        <Typography gutterBottom className={classes.bioText}>
          Followers
        </Typography>
        <Typography gutterBottom variant="h6">
          420
        </Typography>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.link}>
        <Link
          style={{ color: lightGreen[900] }}
          href="#"
          onClick={(e) => e.preventDefault}
        >
          View Profile
        </Link>
      </div>
    </Container>
  );
};

export default LeftProfile;
