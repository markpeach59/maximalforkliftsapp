import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Engines = (props) => {
  const { engines, onEngineSel, selectedEngine } = props;

  var aa = "";
  if (selectedEngine) {
    aa = selectedEngine.enginetype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Engine</FormLabel>

        <RadioGroup aria-label="engines" name="engines" row={true}>
          {engines.map((engine) => (
            <FormControlLabel
              key={engine._id}
              value={engine.enginetype}
              control={<Radio color="primary" />}
              label={engine.enginetype}
              onChange={() => onEngineSel(engine)}
              checked={aa === engine.enginetype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Engines;
