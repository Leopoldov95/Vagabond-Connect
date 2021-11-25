import React, { Fragment } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ImageOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { lightGreen } from "@material-ui/core/colors";
import CountryNav from "../country/countryNav";
// API calls
import { signup } from "../../api/users";

const useStyles = makeStyles((theme) => ({
  container: {
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
}));

const SignUp = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedFile: null,
  });

  const [errors, setErrors] = React.useState<any>({});

  const toggleMode = () => {
    setFormData({
      firstName: "",
      lastName: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
      selectedFile: null,
    });
    setErrors({});
    setIsSignUp(!isSignUp);
  };
  const handleChange = (e?: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCapture = ({ target }: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onloadend = () => {
      setFormData({ ...formData, selectedFile: reader.result });
    };
    /* const file = target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData); */
    /*  setFormData({
      ...formData,
      selectedFile: target.files[0],
    }); */
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
  };

  // Handle IMG upload, only use IF/AFTER form validation has been completed

  const handleCallback = (data) => {
    setFormData({
      ...formData,
      country: data?.code,
    });
  };
  // note that must also have server side validation is case email alrady exists or if user credentials are wrong
  // Main Form Submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    isSignUp ? onSubmitValidation() : onLoginValidation();

    //const imgURL = await handleImgUpload();
    // will then want to post data here
    // may want to destructur data

    // handle img file HERE!!!
    const result = await signup(formData, history);
    console.log(result);
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
              <Fragment>
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
                  <CountryNav handleCallback={handleCallback} />
                </Grid>
              </Fragment>
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
              <Fragment>
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
                    <Typography component="span" style={{ marginLeft: 10 }}>
                      Image Selected!
                    </Typography>
                  ) : (
                    ""
                  )}
                </div>
              </Fragment>
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {!isSignUp ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={toggleMode} variant="body2">
                New User? Create An Account
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
