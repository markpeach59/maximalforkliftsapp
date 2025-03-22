import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Safetybluespot = props => {
  const { safetybluespots, onSafetybluespotSel, selectedSafetybluespot } = props;

  var aa = "X";
  if (selectedSafetybluespot) {
    aa = selectedSafetybluespot.safetybluespottype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Safety Blue Spot</FormLabel>

        <RadioGroup aria-label="safetybluespots" name="safetybluespots" row={true}>
          {safetybluespots.map(safetybluespot => (
            <FormControlLabel
              key={safetybluespot._id}
              value={safetybluespot.safetybluespottype}
              control={<Radio color="primary" />}
              label={safetybluespot.safetybluespottype}
              onChange={() => onSafetybluespotSel(safetybluespot)}
              checked={aa === safetybluespot.safetybluespottype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Safetybluespot;