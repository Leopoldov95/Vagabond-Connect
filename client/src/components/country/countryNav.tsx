import React from "react";
import all from "./allCountries";
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

const CountryMenu = () => {
  const classes = useStyles();
  const [country, setCountry] = React.useState({
    name: "",
    code: "",
    continent: "",
    index: 0,
  });

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setCountry({
      name: all[event.target.value].name,
      code: all[event.target.value].code,
      continent: all[event.target.value].continent,
      index: event.target.value,
    });
  };
  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
      <Select
        value={country.index}
        onChange={handleChange}
        label="Country"
        autoWidth
      >
        {all.map((val, index) => (
          <MenuItem value={index}>
            <img
              style={{ width: 20, marginRight: 10 }}
              alt={val.name}
              src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${val.code.toLowerCase()}.svg`}
            />
            {val.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryMenu;
