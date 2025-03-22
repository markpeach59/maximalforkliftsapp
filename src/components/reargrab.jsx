import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Reargrabs = props => {
  const { reargrabs, onReargrabSel, selectedReargrab } = props;

  var aa = "X";
  if (selectedReargrab) {
    aa = selectedReargrab.reargrabtype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Rear Grab Handle with Horn</FormLabel>

        <RadioGroup aria-label="reargrabs" name="reargrabs" row={true}>
          {reargrabs.map(reargrab => (
            <FormControlLabel
              key={reargrab._id}
              value={reargrab.reargrabtype}
              control={<Radio color="primary" />}
              label={reargrab.reargrabtype}
              onChange={() => onReargrabSel(reargrab)}
              checked={aa === reargrab.reargrabtype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Reargrabs;
