import {
  Container,
  makeStyles,
  Theme,
  Avatar,
  Typography,
  Divider,
  Link,
  Paper,
} from "@material-ui/core";

import { lightGreen } from "@material-ui/core/colors";
import countries from "../country/countries";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    position: "sticky",
    top: theme.spacing(10),
    padding: 0,
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: lightGreen[500],
    color: "white",
    alignItems: "center",
    padding: "24px 0",
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
  routerLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));
const LeftProfile = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper>
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
            <img
              style={{ width: 20, marginRight: 10 }}
              alt={countries["GB"].name}
              src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${countries[
                "GB"
              ].code.toLowerCase()}.svg`}
            />
            {`${countries["GB"].name}, ${countries["GB"].continent}`}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.profileInfo}>
          <Typography gutterBottom className={classes.bioText}>
            Following
          </Typography>
          <Typography gutterBottom variant="h6">
            70
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.profileInfo}>
          <Typography gutterBottom className={classes.bioText}>
            Followers
          </Typography>
          <Typography gutterBottom variant="h6">
            440
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.link}>
          <a href="/profile" className={classes.routerLink}>
            <Link
              style={{ color: lightGreen[900] }}
              href={`/profile`}
              onClick={(e) => e.preventDefault}
            >
              View Profile
            </Link>
          </a>
        </div>
      </Paper>
    </Container>
  );
};

export default LeftProfile;
