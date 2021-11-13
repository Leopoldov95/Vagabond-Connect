import * as React from "react";
import { makeStyles, IconButton, Button, Theme } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import countries from "../../country/countries";
import CountryMenu from "../../country/countryNav";
const useStyles = makeStyles((theme: Theme) => ({
  itemContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  list: {
    listStyle: "none",
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    fontSize: 18,
  },
}));

/* interface Props {
  favorite: string[];
  isFavoriteEdit: any;
} */

/////// IMPORTANT ///////
// The tools to make changes should be here, however the functions to change the top level state must be in parent component
// set country name to '' or null
const CountryList = (props: any) => {
  const classes = useStyles();
  // perhaps create a localized list here, then is saved, rewrite the top level state
  const [localCountries, setLocalCountries] = React.useState(props.countries);
  const [isEdit, setIsEdit] = React.useState(false);
  console.log(localCountries);
  return (
    <>
      {localCountries.map((item: any) => (
        <div className={classes.itemContainer} key={item}>
          <div>
            <li value={countries[item].code} className={classes.list}>
              <img
                style={{ width: 30, marginRight: 10 }}
                alt={countries[item].name}
                src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${countries[
                  item
                ].code.toLowerCase()}.svg`}
              />
              {countries[item].name}
            </li>
          </div>
          <div
            style={props.isEdit ? { display: "block" } : { display: "none" }}
          >
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton>
              <Delete color="secondary" />
            </IconButton>
          </div>
        </div>
      ))}
      {props.isEdit && (
        <div>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: 20 }}
          >
            Save
          </Button>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
        </div>
      )}
    </>
  );
};

export default CountryList;
