import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Blinkey = props => {
  const { blinkeys, onBlinkeySel, selectedBlinkey } = props;

  var aa = "X";
  if (selectedBlinkey) {
    aa = selectedBlinkey.blinkeytype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Blinkey</FormLabel>

        <RadioGroup aria-label="blinkeys" name="blinkeys" row={true}>
          {blinkeys.map(blinkey => (
            <FormControlLabel
              key={blinkey._id}
              value={blinkey.blinkeytype}
              control={<Radio color="primary" />}
              label={blinkey.blinkeytype}
              onChange={() => onBlinkeySel(blinkey)}
              checked={aa === blinkey.blinkeytype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Blinkey;
