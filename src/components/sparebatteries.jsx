import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Sparebatteries = props => {
  const { spares, onSpareSel, selectedSpare } = props;

  var aa = "";
  if (selectedSpare) {
    aa = selectedSpare.sparetype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Spare Battery</FormLabel>

        <RadioGroup aria-label="sparebattery" name="sparebattery" row={true}>
          {spares.map(spare => (
            <FormControlLabel
              key={spare._id}
              value={spare.sparetype}
              control={<Radio color="primary" />}
              label={spare.sparetype}
              onChange={() => onSpareSel(spare)}
              checked={aa === spare.sparetype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Sparebatteries;