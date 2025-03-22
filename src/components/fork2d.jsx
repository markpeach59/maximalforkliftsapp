import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Fork2ds = props => {
  const { fork2ds, onFork2dSel, selectedFork2d } = props;

  var aa = "";
  if (selectedFork2d) {
    aa = selectedFork2d.forklength;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Forks</FormLabel>

        <RadioGroup aria-label="fork2ds" name="fork2ds" row={true}>
          {fork2ds.map(fork2d => (
            <FormControlLabel
              key={fork2d._id}
              value={fork2d.forklength}
              control={<Radio color="primary" />}
              label={fork2d.forklength}
              onChange={() => onFork2dSel(fork2d)}
              checked={aa === fork2d.forklength}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Fork2ds;
