import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Armguards = props => {
  const { armguards, onArmguardSel, selectedArmguard } = props;

  var aa = "X";
  if (selectedArmguard) {
    aa = selectedArmguard.armguardtype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Arm Guard</FormLabel>

        <RadioGroup aria-label="armguards" name="armguards" row={true}>
          {armguards.map(armguard => (
            <FormControlLabel
              key={armguard._id}
              value={armguard.armguardtype}
              control={<Radio color="primary" />}
              label={armguard.armguardtype}
              onChange={() => onArmguardSel(armguard)}
              checked={aa === armguard.armguardtype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Armguards;
