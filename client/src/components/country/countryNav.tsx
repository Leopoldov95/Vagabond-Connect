import * as React from "react";
import countries from "./countries";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 180,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const CountryNav = (props: any) => {
  const classes = useStyles();
  const [country, setCountry] = React.useState(
    props.existingCountry ? props.existingCountry : "US"
  );
  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setCountry(countries[event.target.value].code);
    props.callback(countries[event.target.value].code); // this will "pass" the country value to the parent component and can be handled there
  };
  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
      <Select value={country} onChange={handleChange} label="Country" autoWidth>
        {Object.keys(countries).map((key) => (
          <MenuItem value={countries[key].code} key={key}>
            <img
              style={{ width: 20, marginRight: 10 }}
              alt={countries[key].name}
              src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${countries[
                key
              ].code.toLowerCase()}.svg`}
            />
            {countries[key].name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryNav;
