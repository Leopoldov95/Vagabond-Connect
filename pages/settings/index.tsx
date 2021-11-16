import * as React from "react";
import {
  Typography,
  Theme,
  Container,
  makeStyles,
  Divider,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },

  settingItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const Settings = () => {
  const classes = useStyles();
  const [privacy, setPrivacy] = React.useState("everyone");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrivacy(event.target.value as string);
  };
  return (
    <Container className={classes.container}>
      <Typography className={classes.header} variant="h3">
        Account Settings
      </Typography>
      <Divider style={{ backgroundColor: lightGreen[200] }} />
      <div>
        <ul>
          <li className={classes.settingItem}>
            <Typography>Name</Typography>
            <Typography>Giga Chad</Typography>
          </li>
          <Divider style={{ backgroundColor: lightGreen[50] }} />
          <li className={classes.settingItem}>
            <Typography>Email</Typography>
            <Typography>testUser@Gmail.com</Typography>
          </li>
          <Divider style={{ backgroundColor: lightGreen[50] }} />
          <li className={classes.settingItem}>
            <Typography>Country</Typography>
            <Typography>GB</Typography>
          </li>
          <Divider style={{ backgroundColor: lightGreen[50] }} />
          <li className={classes.settingItem}>
            <Typography>Who can see my profile?</Typography>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={privacy}
                onChange={handleChange}
              >
                <MenuItem value={"everyone"}>Everyone</MenuItem>
                <MenuItem value={"followers"}>Followers</MenuItem>
              </Select>
            </FormControl>
          </li>
          <Divider style={{ backgroundColor: lightGreen[50] }} />
        </ul>
      </div>
    </Container>
  );
};

export default Settings;
