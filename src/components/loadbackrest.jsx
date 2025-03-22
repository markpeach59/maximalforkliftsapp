import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Loadbackrests = props => {
  const { loadbackrests, onLoadbackrestSel, selectedLoadbackrest } = props;

  var aa = "X";
  if (selectedLoadbackrest) {
    aa = selectedLoadbackrest.loadbackresttype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Load Backrest</FormLabel>

        <RadioGroup aria-label="loadbackrests" name="loadbackrests" row={true}>
          {loadbackrests.map(loadbackrest => (
            <FormControlLabel
              key={loadbackrest._id}
              value={loadbackrest.loadbackresttype}
              control={<Radio color="primary" />}
              label={loadbackrest.loadbackresttype}
              onChange={() => onLoadbackrestSel(loadbackrest)}
              checked={aa === loadbackrest.loadbackresttype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Loadbackrests;
