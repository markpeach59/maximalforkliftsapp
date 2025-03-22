import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Forkpositioners = props => {
  const {
    forkpositioners,
    onForkpositionerSel,
    selectedForkpositioner
  } = props;

  var aa = "X";
  if (selectedForkpositioner) {
    aa = selectedForkpositioner.forkpositionertype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Sideshifting Fork Positioner</FormLabel>

        <RadioGroup
          aria-label="forkpositioners"
          name="forkpositioners"
          row={true}
        >
          {forkpositioners.map(forkpositioner => (
            <FormControlLabel
              key={forkpositioner._id}
              value={forkpositioner.forkpositionertype}
              control={<Radio color="primary" />}
              label={forkpositioner.forkpositionertype}
              onChange={() => onForkpositionerSel(forkpositioner)}
              checked={aa === forkpositioner.forkpositionertype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Forkpositioners;
