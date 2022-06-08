import * as React from "react";
import { API_ERROR } from "../../constants/actionTypes";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ImageOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { lightGreen } from "@material-ui/core/colors";
import CountryNav from "../country/countryNav";
// API calls
// Redux importa
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../../actions/users";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  country: "US",
  selectedFile: null,
};
const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    backgroundColor: "white",
    padding: theme.spacing(2),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: lightGreen[400],
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none",
  },
  link: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  upload: {
    padding: theme.spacing(1),
  },
  imgButton: {
    backgroundColor: lightGreen[600],
    padding: "4px 16px",
    color: "white",
    "&:hover": {
      backgroundColor: lightGreen[500],
    },
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

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [formData, setFormData] = React.useState<any>(initialState);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<any>({});
  const snackbarMessage = useSelector((state: any) => state.snackbar);
  //const API_ERRORS = useSelector((state: any) => state.apiErrors);

  // remember that using dispatch means that we are accessing state that is usable across our entire appplication
  const dispatch = useDispatch();
  // if there is an auth error, make sure to clear it
  React.useEffect(() => {
    if (snackbarMessage?.type === "error") {
      setLoading(false);
    }
  }, [snackbarMessage]);
  const toggleMode = () => {
    setFormData(initialState);
    setErrors({});
    setIsSignUp(!isSignUp);
  };
  const handleChange = (e?: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors?.[e.target.name]) {
      let state = { ...errors };
      delete state?.[e.target.name];
      setErrors(state);
    }
  };
  const handleCallback = (country: String) => {
    setFormData({ ...formData, country: country });
  };
  const handleCapture = ({ target }: any) => {
    //console.log(target);
    if (errors?.upload) {
      let state = { ...errors };
      delete state?.upload;
      setErrors(state);
    }
    if (errors?.selectedFile) {
      let state = { ...errors };
      delete state?.selectedFile;
      setErrors(state);
    }
    if (target?.files.length > 0) {
      if (target.files[0].size > 10000000) {
        setErrors({ ...errors, upload: "File Cannot Exceed 10 MB!" });
        return setFormData({ ...formData, selectedFile: null });
      }
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onloadend = () => {
        setFormData({ ...formData, selectedFile: reader.result });
      };
    } else {
      setFormData({ ...formData, selectedFile: null });
    }
  };

  // login validarion

  const onLoginValidation = () => {
    const allErrors: any = {};
    if (formData.email.length < 1) {
      allErrors.email = "Must Enter Valid Email";
    }
    if (formData.password.length < 1) {
      allErrors.password = "Must Enter a Password";
    }
    setErrors({
      ...allErrors,
    });
    return allErrors;
  };

  // Simple client-side validation for creating account
  const onSubmitValidation = () => {
    const regex = new RegExp(/.+@.+\..+/);
    const allErrors: any = {};
    if (formData.firstName.length < 1) {
      allErrors.firstName = "Must Enter First Name";
    }
    if (formData.lastName.length < 1) {
      allErrors.lastName = "Must Enter Last Name";
    }
    if (!regex.test(formData.email)) {
      allErrors.email = "Must Enter Valid Email";
    }
    if (formData.password.length < 1) {
      allErrors.password = "Must Enter a Password";
    }
    if (formData.confirmPassword.length < 1) {
      allErrors.confirmPassword = "Must Enter a Password";
    }
    if (formData.password !== formData.confirmPassword) {
      allErrors.password = "Passwords Do Not Match";
      allErrors.confirmPassword = "Passwords Do Not Match";
    }
    setErrors({
      ...allErrors,
    });
    return allErrors;
  };

  // Handle IMG upload, only use IF/AFTER form validation has been completed
  // note that must also have server side validation is case email alrady exists or if user credentials are wrong
  // Main Form Submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isErrors = isSignUp
      ? await onSubmitValidation()
      : await onLoginValidation();
    if (Object.keys(isErrors).length < 1) {
      setLoading(true);
      isSignUp
        ? dispatch(signup(formData, history))
        : dispatch(signin(formData, history));
    }
    // maybe add extra feedback here?
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {!isSignUp ? "Sign In" : "Sign Up"}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {isSignUp && (
              <React.Fragment>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    error={Boolean(errors?.firstName)}
                    helperText={errors?.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="lname"
                    error={Boolean(errors?.lastName)}
                    helperText={errors?.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CountryNav
                    callback={handleCallback}
                    existingCountry={formData.country}
                  />
                </Grid>
              </React.Fragment>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                error={Boolean(errors?.email)}
                helperText={errors?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                error={Boolean(errors?.password)}
                helperText={errors?.password}
              />
            </Grid>
            {isSignUp && (
              <React.Fragment>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="off"
                    error={Boolean(errors?.confirmPassword)}
                    helperText={errors?.confirmPassword}
                  />
                </Grid>

                <div className={classes.upload}>
                  <Typography>Profile Picture</Typography>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleCapture}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      startIcon={<ImageOutlined />}
                      component="span"
                      className={classes.imgButton}
                    >
                      Upload
                    </Button>
                  </label>
                  {formData.selectedFile ? (
                    <React.Fragment>
                      <Typography component="span" style={{ marginLeft: 10 }}>
                        Image Selected!
                      </Typography>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                  {errors?.upload && (
                    <Typography
                      component="span"
                      style={{ marginLeft: 10 }}
                      color="secondary"
                    >
                      {errors?.upload}
                    </Typography>
                  )}
                </div>
              </React.Fragment>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={Object.keys(errors).length > 0}
          >
            {!isSignUp ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                onClick={toggleMode}
                variant="body2"
                className={classes.link}
              >
                {isSignUp
                  ? "Already Have An Account?"
                  : "New User? Create An Account"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {loading && (
        <div className={classes.overlayLoader}>
          <CircularProgress
            size={60}
            style={{ position: "absolute", zIndex: 10 }}
          />
        </div>
      )}
    </Container>
  );
};

export default SignUp;
