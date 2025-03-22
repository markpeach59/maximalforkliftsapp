import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Aircons = props => {
  const { aircons, onAirconSel, selectedAircon } = props;

  var aa = "X";
  if (selectedAircon) {
    aa = selectedAircon.aircontype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Air Conditioner</FormLabel>

        <RadioGroup aria-label="aircons" name="aircons" row={true}>
          {aircons.map(aircon => (
            <FormControlLabel
              key={aircon._id}
              value={aircon.aircontype}
              control={<Radio color="primary" />}
              label={aircon.aircontype}
              onChange={() => onAirconSel(aircon)}
              checked={aa === aircon.aircontype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Aircons;
