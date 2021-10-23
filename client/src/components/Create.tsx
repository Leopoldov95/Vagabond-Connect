import {
  Card,
  Typography,
  makeStyles,
  Theme,
  Avatar,
  Divider,
  Button,
} from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  cardContent: {
    display: "flex",
    marginTop: 10,
  },
  button: {
    backgroundColor: blueGrey[50],
    textTransform: "none",
    borderRadius: 8,
    width: "100%",
    "&:hover": {
      backgroundColor: blueGrey[100],
    },
  },
}));

const Create = () => {
  const classes = useStyles();
  return (
    <Card className={classes.cardContainer}>
      <Typography gutterBottom variant="h6">
        Post Something
      </Typography>
      <Divider />
      <div className={classes.cardContent}>
        <Avatar
          alt="post_owner_icon"
          src="https://melmagazine.com/wp-content/uploads/2021/01/66f-1.jpg"
          style={{ marginRight: 10 }}
        />
        <Button variant="contained" className={classes.button} disableElevation>
          Share Your Adventures...
        </Button>
      </div>
    </Card>
  );
};

export default Create;
