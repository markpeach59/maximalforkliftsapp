import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Tyres = props => {
  const { tyres, onTyreSel, selectedTyre } = props;

  var aa = "";
  if (selectedTyre) {
    aa = selectedTyre.tyretype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Tyres</FormLabel>

        <RadioGroup aria-label="tyres" name="tyres" row={true}>
          {tyres.map(tyre => (
            <FormControlLabel
              key={tyre._id}
              value={tyre.tyretype}
              control={<Radio color="primary" />}
              label={tyre.tyretype}
              onChange={() => onTyreSel(tyre)}
              checked={aa === tyre.tyretype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Tyres;
