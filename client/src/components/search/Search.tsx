import * as React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "absolute",
    top: theme.spacing(4),
    left: 0,
    width: "100%",
  },
  listContainer: {
    padding: theme.spacing(1),
  },
  listItem: {
    margin: "16px 0",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  empty: {
    padding: "1rem 8px",
    color: "gray",
  },
}));

const Search = ({ results, setSearchResult, setSearch, search }) => {
  console.log("I am in use!");
  const [isOpen, setIsOpen] = React.useState(search.length > 1);
  function useOutsideAlerter(ref) {
    React.useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (isOpen && ref.current && !ref.current.contains(event.target)) {
          console.log("You clicked outside of me!");
          console.log(isOpen);
          setIsOpen(false);
          setSearchResult([]);
          setSearch("");
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const classes = useStyles();
  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);
  const handleClick = (e: any) => {
    setIsOpen(false);
    setSearchResult([]);
    setSearch("");
  };
  return (
    <div
      className={classes.container}
      style={{ display: isOpen ? "block" : "none" }}
      ref={wrapperRef}
    >
      <Paper>
        {results.length > 0 ? (
          <ul className={classes.listContainer}>
            {results.map((user) => (
              <li>
                <Link
                  to={`/profile/${user._id}`}
                  className={classes.listItem}
                  key={user.firstName}
                  onClick={handleClick}
                >
                  <Avatar
                    alt={user.firstName}
                    src={user.profile_cloudinary}
                    style={{ marginRight: 10 }}
                  />
                  <Typography>
                    {user.firstName} {user.lastName}
                  </Typography>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={classes.empty}>
            <Typography>No Users Found</Typography>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Search;
