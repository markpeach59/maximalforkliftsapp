import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Forks = props => {
  const { forks, onForkSel, selectedFork } = props;

  var aa = "";
  if (selectedFork) {
    aa = selectedFork.forklength;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Forks</FormLabel>

        <RadioGroup
          aria-label="forks"
          name="forks"
          //value={value}
          //onChange={handleChange}
          row={true}
        >
          {forks.map(fork => (
            <FormControlLabel
              key={fork._id}
              value={fork.forklength}
              control={<Radio color="primary" />}
              label={fork.forklength}
              onChange={() => onForkSel(fork)}
              checked={aa === fork.forklength}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Forks;
