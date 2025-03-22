import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Voltage = (props) => {
  const { voltages, onVoltageSel, selectedVoltage } = props;

  //console.log("Voltage", voltages);

  var aa = "";
  if (selectedVoltage) {
    aa = selectedVoltage.label;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Voltage Type</FormLabel>

        <RadioGroup aria-label="voltage" name="voltage" row={true}>
          {voltages.map((voltage) => (
            <FormControlLabel
              key={voltage._id}
              value={voltage.label}
              control={<Radio color="primary" />}
              label={voltage.label}
              onChange={() => onVoltageSel(voltage)}
              checked={aa === voltage.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
    
  );
};

export default Voltage;