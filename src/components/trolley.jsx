import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Trolley = props => {
  const { trolleys, onTrolleySel, selectedTrolley } = props;

  var aa = "X";
  if (selectedTrolley) {
    aa = selectedTrolley.trolleytype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Trolley</FormLabel>

        <RadioGroup aria-label="trolleys" name="trolleys" row={true}>
          {trolleys.map(trolley => (
            <FormControlLabel
              key={trolley._id}
              value={trolley.trolleytype}
              control={<Radio color="primary" />}
              label={trolley.trolleytype}
              onChange={() => onTrolleySel(trolley)}
              checked={aa === trolley.trolleytype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Trolley;
