import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Upsweptexhausts = props => {
  const { upsweptexhausts, onUpsweptexhaustSel, selectedUpsweptexhaust, selectedCabin } = props;

  var aa = "X";
  if (selectedUpsweptexhaust) {
    aa = selectedUpsweptexhaust.upsweptexhausttype;
  }

  function onCabin () {
    /* selected FP will always mean 3rd + 4th has been selected */
    return selectedCabin ? true:false;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Upswept Exhaust</FormLabel>

        <RadioGroup aria-label="upsweptexhausts" name="upsweptexhausts" row={true}>
          {upsweptexhausts.map(upsweptexhaust => (
            <FormControlLabel
              key={upsweptexhaust._id}
              value={upsweptexhaust.upsweptexhausttype}
              control={<Radio color="primary" />}
              label={upsweptexhaust.upsweptexhausttype}
              disabled ={onCabin()}
              onChange={() => onUpsweptexhaustSel(upsweptexhaust)}
              checked={aa === upsweptexhaust.upsweptexhausttype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Upsweptexhausts;