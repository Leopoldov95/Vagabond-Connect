import * as React from "react";
import { useDispatch } from "react-redux";
import { makeStyles, Button, Theme, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import SingleCountry from "./SingleCountry";
import { updateUserCountryList } from "../../../actions/users";
import { lightGreen } from "@material-ui/core/colors";
const useStyles = makeStyles((theme: Theme) => ({
  itemContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  listContainer: {
    maxHeight: 300,
    overflowY: "auto",
  },
  list: {
    listStyle: "none",
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    fontSize: 18,
  },
  countryAction: {
    display: "flex",
    justifyContent: "center",
    margin: "1rem 0",
  },
  btnAdd: {
    color: lightGreen[400],
    border: `1px solid ${lightGreen[400]}`,
    "&:hover": {
      color: lightGreen[500],
      border: `1px solid ${lightGreen[500]}`,
      backgroundColor: lightGreen[50],
    },
  },
}));

/////// IMPORTANT ///////
// The tools to make changes should be here, however the functions to change the top level state must be in parent component
// set country name to '' or null
const CountryList = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // perhaps create a localized list here, then is saved, rewrite the top level state
  const [isSame, setIsSame] = React.useState(true); // will remain true until user changes value of local countries array
  const [localCountries, setLocalCountries] = React.useState(props.countries); // this is needed so we can make chnges to the local level
  // here we will handle the changed country
  // will need this to handle profile url changes
  React.useEffect(() => {
    setLocalCountries(props.countries);
  }, [props.countries]);
  React.useEffect(() => {
    if (JSON.stringify(localCountries) !== JSON.stringify(props.countries)) {
      setIsSame(false);
    } else {
      setIsSame(true);
    }
  }, [localCountries]);
  React.useEffect(() => {
    if (!props.isEdit) {
      setLocalCountries(props.countries);
    }
  }, [props.isEdit]);
  const handleCountry = (country: String, idx: number) => {
    const newList = [...localCountries]; // Needed to make a "copy" of the array, otherwise it was changing the value of the parent state since arrays are passed by reference
    newList[idx] = country;
    setLocalCountries(newList);
  };
  const handleDelete = (idx: number) => {
    const newList = [...localCountries];
    newList.splice(idx, 1);
    setLocalCountries(newList);
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.setIsEdit(false);
  };

  const addCountry = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.name === "favorite") {
      if (localCountries.length >= 5) {
        return;
      }
      const newList = [...localCountries];
      newList.push("US");
      setLocalCountries(newList);
    } else if (props.name === "visited") {
      const newList = [...localCountries];
      newList.push("US");
      setLocalCountries(newList);
    }
  };
  // will want to reredner and/or close editor on submit
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(updateUserCountryList(props.name, localCountries));
    props.setIsEdit(false);
  };
  return (
    <React.Fragment>
      <div className={classes.listContainer}>
        {localCountries && localCountries.length > 0 ? (
          localCountries.map((item: any, idx: number) => (
            <SingleCountry
              key={idx}
              country={item}
              setCountry={handleCountry}
              handleDelete={handleDelete}
              isEdit={props.isEdit}
              idx={idx}
            />
          ))
        ) : (
          <Typography
            variant="h6"
            gutterBottom
            style={{ color: "gray" }}
          >{`No ${props.name} Countries`}</Typography>
        )}
      </div>
      {props.isEdit && (
        <React.Fragment>
          <div className={classes.countryAction}>
            <Button
              variant="outlined"
              className={classes.btnAdd}
              onClick={addCountry}
            >
              <Add />
            </Button>
          </div>

          <div>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: 20 }}
              disabled={isSame}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CountryList;
