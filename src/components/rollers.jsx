import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Rollers = props => {
  const { rollers, onRollerSel, selectedRoller } = props;

  var aa = "";
  if (selectedRoller) {
    aa = selectedRoller.rollertype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Rollers</FormLabel>

        <RadioGroup aria-label="rollers" name="rollers" row={true}>
          {rollers.map(roller => (
            <FormControlLabel
              key={roller._id}
              value={roller.rollertype}
              control={<Radio color="primary" />}
              label={roller.rollertype}
              onChange={() => onRollerSel(roller)}
              checked={aa === roller.rollertype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Rollers;