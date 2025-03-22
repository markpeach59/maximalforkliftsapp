import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Halolight = props => {
  const { halolights, onHalolightSel, selectedHalolight } = props;

  var aa = "X";
  if (selectedHalolight) {
    aa = selectedHalolight.halolighttype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Halo Light</FormLabel>

        <RadioGroup aria-label="halolights" name="halolights" row={true}>
          {halolights.map(halolight => (
            <FormControlLabel
              key={halolight._id}
              value={halolight.halolighttype}
              control={<Radio color="primary" />}
              label={halolight.halolighttype}
              onChange={() => onHalolightSel(halolight)}
              checked={aa === halolight.halolighttype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Halolight;