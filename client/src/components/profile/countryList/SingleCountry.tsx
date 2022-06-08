import * as React from "react";
import { Delete } from "@material-ui/icons";
import countries from "../../country/countries";
import CountryNav from "../../country/countryNav";
import { makeStyles, IconButton, Theme } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  itemContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editContainer: {
    margin: "8px 0",
  },
  list: {
    listStyle: "none",
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    fontSize: 18,
  },
}));
const SingleCountry = ({ country, setCountry, handleDelete, isEdit, idx }) => {
  const classes = useStyles();
  // This is to "close" the country list edit when go out of the main editting mode

  const handleCallback = (selectedCountry: String) => {
    setCountry(selectedCountry, idx);
  };
  return (
    <div className={classes.itemContainer}>
      <div className={classes.editContainer}>
        {isEdit ? (
          <CountryNav callback={handleCallback} existingCountry={country} />
        ) : (
          <li value={countries[country].code} className={classes.list}>
            <img
              style={{ width: 30, marginRight: 10 }}
              alt={countries[country].name}
              src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${countries[
                country
              ].code.toLowerCase()}.svg`}
            />
            {countries[country].name}
          </li>
        )}
      </div>
      <div style={isEdit ? { display: "block" } : { display: "none" }}>
        <IconButton onClick={() => handleDelete(idx)}>
          <Delete color="secondary" />
        </IconButton>
      </div>
    </div>
  );
};

export default SingleCountry;
