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
  IconButton,
  Button,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { Edit, Warning } from "@material-ui/icons";
import CountryNav from "../../components/country/countryNav";
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
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 1rem",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  edit: {
    display: "flex",
    alignItems: "center",
  },
  actionContainer: {
    display: "flex",
    marginTop: theme.spacing(2),
    justifyContent: "center",
  },
  btnDelete: {
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.light,
    },
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
            <div className={classes.edit}>
              <Typography>Giga Chad</Typography>
              <IconButton>
                <Edit />
              </IconButton>
            </div>
          </li>
          <Divider style={{ backgroundColor: lightGreen[100] }} />
          <li className={classes.settingItem}>
            <Typography>Email</Typography>
            <div className={classes.edit}>
              <Typography>testUser@gmail.com</Typography>
              <IconButton>
                <Edit />
              </IconButton>
            </div>
          </li>
          <Divider style={{ backgroundColor: lightGreen[100] }} />
          <li className={classes.settingItem}>
            <Typography>Country</Typography>
            <div>
              <CountryNav />
            </div>
          </li>
          <Divider style={{ backgroundColor: lightGreen[100] }} />
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
      <div className={classes.actionContainer}>
        <Button style={{ margin: 10 }} variant="outlined" color="primary">
          Save
        </Button>
        <Button style={{ margin: 10 }} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button
          style={{ margin: 10 }}
          className={classes.btnDelete}
          variant="contained"
          startIcon={<Warning />}
        >
          Delete Account
        </Button>
      </div>
    </Container>
  );
};

export default Settings;
