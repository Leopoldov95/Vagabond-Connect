import * as React from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  Theme,
  Container,
  makeStyles,
  Divider,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { Edit, Warning, Close } from "@material-ui/icons";
import { editUserDetails } from "../../actions/users";
import CountryNav from "../country/countryNav";
import Delete from "./Delete";
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
const SettingsLayout = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const [settingsData, setSettingsData] = React.useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    country: user?.country,
    privacy: "everyone",
  });
  const [toggleEdit, setToggleEdit] = React.useState({
    name: false,
    email: false,
  });
  const [errors, setErrors] = React.useState<any>({});
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (errors?.message) {
      setTimeout(() => {
        setErrors({});
      }, 3000);
    }
  }, [errors?.message]);
  const handleChange = (e: React.ChangeEvent<any>) => {
    if (errors) {
      setErrors({});
    }
    setSettingsData({ ...settingsData, [e.target.name]: e.target.value });
  };

  const checkChanges = () => {
    for (let data in settingsData) {
      //console.log(user[data]);
      if (settingsData[data] !== user[data]) {
        return;
      }
    }
    return { message: "No changes have been made!" };
  };

  const handleCallback = (country: String) => {
    setSettingsData({ ...settingsData, country: country });
  };
  // have client side validation
  const onSubmitValidation = () => {
    const changeValidation = checkChanges();
    if (changeValidation) {
      setErrors({ ...errors, ...changeValidation });
      return false;
    } else {
      const regex = new RegExp(/.+@.+\..+/);
      const allErrors: any = {};
      if (settingsData.firstName.length < 1) {
        allErrors.firstName = "Must Enter First Name";
      }
      if (settingsData.lastName.length < 1) {
        allErrors.lastName = "Must Enter Last Name";
      }
      if (!regex.test(settingsData.email)) {
        allErrors.email = "Must Enter Valid Email";
      }
      setErrors({ ...errors, ...allErrors });
      if (Object.keys(allErrors).length >= 1) {
        return false;
      }
    }
    return true;
  };

  // have save button disabled unless changes have been made
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isValid = onSubmitValidation();
    console.log(isValid);
    if (isValid) {
      dispatch(editUserDetails(settingsData));
    }
  };

  // if user want to delete account, will open popup and require password as well as warning that all posts will be delted
  // as a reference, store all followers as userIds and use length property
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
              {toggleEdit.name ? (
                <React.Fragment>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={settingsData.firstName}
                    onChange={handleChange}
                    autoComplete="off"
                    error={Boolean(errors?.firstName)}
                    helperText={errors?.lastName}
                    style={{ marginRight: 10 }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={settingsData.lastName}
                    onChange={handleChange}
                    autoComplete="off"
                    error={Boolean(errors?.lastName)}
                    helperText={errors?.lastName}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {errors?.firstName && (
                    <Typography
                      color="secondary"
                      variant="body2"
                      style={{ marginRight: 10 }}
                    >
                      {errors?.firstName}{" "}
                    </Typography>
                  )}
                  <Typography>
                    {settingsData.firstName} {settingsData.lastName}
                  </Typography>
                  {errors?.lastName && (
                    <Typography color="secondary" variant="body2">
                      {errors?.lastName}{" "}
                    </Typography>
                  )}
                </React.Fragment>
              )}

              <IconButton
                onClick={() =>
                  setToggleEdit({ ...toggleEdit, name: !toggleEdit.name })
                }
              >
                {toggleEdit.name ? <Close /> : <Edit />}
              </IconButton>
            </div>
          </li>
          <Divider style={{ backgroundColor: lightGreen[100] }} />
          <li className={classes.settingItem}>
            <Typography>Email</Typography>
            <div className={classes.edit}>
              {toggleEdit.email ? (
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={settingsData.email}
                  onChange={handleChange}
                  autoComplete="off"
                  error={Boolean(errors?.email)}
                  helperText={errors?.email}
                />
              ) : errors?.email ? (
                <Typography color="secondary" variant="body2">
                  {errors.email}
                </Typography>
              ) : (
                <Typography>{settingsData.email}</Typography>
              )}

              <IconButton
                onClick={() =>
                  setToggleEdit({ ...toggleEdit, email: !toggleEdit.email })
                }
              >
                {toggleEdit.email ? <Close /> : <Edit />}
              </IconButton>
            </div>
          </li>
          <Divider style={{ backgroundColor: lightGreen[100] }} />
          <li className={classes.settingItem}>
            <Typography>Country</Typography>
            <div>
              <CountryNav
                callback={handleCallback}
                existingCountry={settingsData.country}
              />
            </div>
          </li>
          <Divider style={{ backgroundColor: lightGreen[100] }} />
          <li className={classes.settingItem}>
            <Typography>Who can see my profile?</Typography>
            <FormControl className={classes.formControl}>
              <Select
                name="privacy"
                value={settingsData.privacy}
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
      {errors?.message && (
        <Typography color="secondary" align="center">
          {errors?.message}
        </Typography>
      )}
      <div className={classes.actionContainer}>
        <Button
          style={{ margin: 10 }}
          variant="outlined"
          color="primary"
          disabled={toggleEdit.email || toggleEdit.name}
          onClick={handleSubmit}
        >
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
          onClick={() => setOpen(true)}
        >
          Delete Account
        </Button>
      </div>
      <Delete open={open} setOpen={setOpen} />
    </Container>
  );
};

export default SettingsLayout;
