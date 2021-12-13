import * as React from "react";
import { makeStyles, IconButton, Button, Theme } from "@material-ui/core";
import { Edit, Delete, Add } from "@material-ui/icons";
import countries from "../../country/countries";
import CountryNav from "../../country/countryNav";
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
  countryAction: {
    display: "flex",
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
  const [formData, setFormData] = React.useState({
    country: "US",
  });
  const [localCountries, setLocalCountries] = React.useState(props.countries); // this is needed so we can make chnges to the local level
  const [isEdit, setIsEdit] = React.useState(false);
  return (
    <React.Fragment>
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
        <React.Fragment>
          <div className={classes.countryAction}>
            <CountryNav formData={formData} setFormData={setFormData} />
            <Button variant="outlined" color="primary">
              <Add />
            </Button>
          </div>

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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CountryList;