import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Chassis = (props) => {
  const { chassis, onChassisSel, selectedChassis } = props;

  var aa = "";
  if (selectedChassis) {
    aa = selectedChassis.label;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Chassis</FormLabel>

        <RadioGroup aria-label="chassis" name="chassis" row={true}>
          {chassis.map((chass) => (
            <FormControlLabel
              key={chass._id}
              value={chass.label}
              control={<Radio color="primary" />}
              label={chass.label}
              onChange={() => onChassisSel(chass)}
              checked={aa === chass.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
    
  );
};

export default Chassis;