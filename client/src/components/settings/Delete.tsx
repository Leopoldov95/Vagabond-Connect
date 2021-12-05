import * as React from "react";
import {
  Modal,
  Typography,
  makeStyles,
  Theme,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import { Warning } from "@material-ui/icons";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: 500,
    height: 350,
    backgroundColor: "white",
    position: "absolute",
    padding: theme.spacing(2),
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  btnDelete: {
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.light,
    },
  },
}));

const Delete = (props: any) => {
  const classes = useStyles();
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<any>({});
  const handleChange = (e?: any) => {
    setPassword(e.target.value);
  };
  return (
    <Modal open={props?.open}>
      <Container className={classes.container}>
        <Typography gutterBottom variant="h4" color="secondary" align="center">
          Account Deletion
        </Typography>
        <Typography gutterBottom>
          Deleting you account will also delete all your posts and other users
          will no longer be able to find you. Once you delete your account there
          is no way to recover it.
        </Typography>
        <form autoComplete="off">
          <Typography>
            Please enter your password to confirm account deletion:
          </Typography>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            error={Boolean(errors?.password)}
            helperText={errors?.password}
            style={{ margin: "1rem 0" }}
          />
        </form>
        <div>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => props.setOpen(false)}
          >
            Close
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
    </Modal>
  );
};

export default Delete;
