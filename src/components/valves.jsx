import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Valves = props => {
  const { valves, onValveSel, selectedValve, selectedForkpositioner } = props;

  var aa = "";
  if (selectedValve) {
    aa = selectedValve.valvetype;
  }

  function onForkPositioner () {
    /* selected FP will always mean 3rd + 4th has been selected */
    return selectedForkpositioner ? true:false;
  }


  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Valves</FormLabel>

        <RadioGroup aria-label="valves" name="valves" row={true}>
          {valves.map(valve => (
            <FormControlLabel
              key={valve._id}
              value={valve.valvetype}
              control={<Radio color="primary" />}
              label={valve.valvetype}
              disabled ={onForkPositioner()}
              onChange={() => onValveSel(valve)}
              checked={aa === valve.valvetype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Valves;
