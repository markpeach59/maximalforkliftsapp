import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Heaters = props => {
  const { heaters, onHeaterSel, selectedHeater } = props;

  var aa = "X";
  if (selectedHeater) {
    aa = selectedHeater.heatertype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Heater/Demister</FormLabel>

        <RadioGroup aria-label="heaters" name="heaters" row={true}>
          {heaters.map(heater => (
            <FormControlLabel
              key={heater._id}
              value={heater.heatertype}
              control={<Radio color="primary" />}
              label={heater.heatertype}
              onChange={() => onHeaterSel(heater)}
              checked={aa === heater.heatertype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Heaters;
