import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Batterys = props => {
  const { batterys, onBatterySel, selectedBattery, batteryConstraint } = props;

  console.log("Batterys component received:", batterys);
  
  // Ensure batterys is an array
  const batteryArray = Array.isArray(batterys) ? batterys : [];
  
  console.log("Battery array:", batteryArray);
  
  var aa = "X";

  if (selectedBattery) {
    aa = selectedBattery.batterytype;
  }

  // Only split if we have items
  var batterys1 = batteryArray.length > 0 ? batteryArray.slice(0,1) : [];
  var batterys2 = batteryArray.length > 1 ? batteryArray.slice(1) : [];

  console.log("Battery constraint:", batteryConstraint);
  console.log("Batterys1:", batterys1);
  console.log("Batterys2:", batterys2);

  // If we have no batteries, don't render anything
  if (batteryArray.length === 0) {
    console.log("No batteries to render");
    return null;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Batterys</FormLabel>
        <RadioGroup aria-label="batterys" name="batterys" row={true}>
          {batterys1.map(battery => {
            console.log("Rendering battery1:", battery);
            return (
              <FormControlLabel 
                key={battery._id}
                value={battery.batterytype}
                control={<Radio color="primary" />}
                label={battery.batterytype}
                onChange={() => onBatterySel(battery)}
                checked={aa === battery.batterytype}
              />
            );
          })}
          {batterys2.map(battery => {
            console.log("Rendering battery2:", battery);
            return (
              <FormControlLabel 
                key={battery._id}
                value={battery.batterytype}
                control={<Radio color="primary" />}
                disabled={batteryConstraint}
                label={battery.batterytype}
                onChange={() => onBatterySel(battery)}
                checked={aa === battery.batterytype}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Batterys;
