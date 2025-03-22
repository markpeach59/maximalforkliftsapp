import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Stabiliser = props => {
  const { stabilisers, onStabiliserSel, selectedStabiliser } = props;

  var aa = "X";
  if (selectedStabiliser) {
    aa = selectedStabiliser.stabilisertype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Stabiliser Caster Wheel</FormLabel>

        <RadioGroup aria-label="stabilisers" name="stabilisers" row={true}>
          {stabilisers.map(stabiliser => (
            <FormControlLabel
              key={stabiliser._id}
              value={stabiliser.stabilisertype}
              control={<Radio color="primary" />}
              label={stabiliser.stabilisertype}
              onChange={() => onStabiliserSel(stabiliser)}
              checked={aa === stabiliser.stabilisertype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Stabiliser;