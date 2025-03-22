import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Liftybutton = props => {
  const { liftybuttons, onLiftybuttonSel, selectedLiftybutton } = props;

  var aa = "X";
  if (selectedLiftybutton) {
    aa = selectedLiftybutton.liftybuttontype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">2 Sided Lifty Button</FormLabel>

        <RadioGroup aria-label="liftybuttons" name="liftybuttons" row={true}>
          {liftybuttons.map(liftybutton => (
            <FormControlLabel
              key={liftybutton._id}
              value={liftybutton.liftybuttontype}
              control={<Radio color="primary" />}
              label={liftybutton.liftybuttontype}
              onChange={() => onLiftybuttonSel(liftybutton)}
              checked={aa === liftybutton.liftybuttontype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Liftybutton;