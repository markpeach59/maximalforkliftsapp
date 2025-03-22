import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Steerings = props => {
  const { steerings, onSteeringSel, selectedSteering } = props;

  var aa = "X";
  if (selectedSteering) {
    aa = selectedSteering.steeringtype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Electronic Steering</FormLabel>

        <RadioGroup aria-label="steerings" name="steerings" row={true}>
          {steerings.map(steering => (
            <FormControlLabel
              key={steering._id}
              value={steering.steeringtype}
              control={<Radio color="primary" />}
              label={steering.steeringtype}
              onChange={() => onSteeringSel(steering)}
              checked={aa === steering.steeringtype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Steerings;
