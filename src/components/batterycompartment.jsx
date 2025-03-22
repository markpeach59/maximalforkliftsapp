import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Batterycompartments = props => {
  const { batterycompartments, onBatterycompartmentSel, selectedBatterycompartment } = props;

  var aa = "";
  if (selectedBatterycompartment) {
    aa = selectedBatterycompartment.batterycompartmenttype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Battery Compartment</FormLabel>

        <RadioGroup aria-label="batterycompartments" name="batterycompartments" row={true}>
          {batterycompartments.map(batterycompartment => (
            <FormControlLabel
              key={batterycompartment._id}
              value={batterycompartment.batterycompartmenttype}
              control={<Radio color="primary" />}
              label={batterycompartment.batterycompartmenttype}
              onChange={() => onBatterycompartmentSel(batterycompartment)}
              checked={aa === batterycompartment.batterycompartmenttype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Batterycompartments;