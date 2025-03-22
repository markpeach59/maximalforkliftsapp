import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Chargers = props => {
  const { chargers, onChargerSel, selectedCharger } = props;

  var aa = "";
  if (selectedCharger) {
    aa = selectedCharger.chargertype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Chargers</FormLabel>

        <RadioGroup aria-label="chargers" name="chargers" row={true}>
          {chargers.map(charger => (
            <FormControlLabel
              key={charger._id}
              value={charger.chargertype}
              control={<Radio color="primary" />}
              label={charger.chargertype}
              onChange={() => onChargerSel(charger)}
              checked={aa === charger.chargertype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Chargers;
