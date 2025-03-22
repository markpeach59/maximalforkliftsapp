import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import "typeface-roboto";

const EnginesFilter = props => {
  const { engines, onEngineSel, selectedEngine } = props;

  //console.log("AA", selectedEngine.name);

  var aa = "";
  if (selectedEngine) {
    aa = selectedEngine.name;
    //console.log("AA", selectedEngine.name);
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Engine Type</FormLabel>
        <RadioGroup aria-label="enginetype" name="enginetype" row={true}>
          {engines.map((engine, index) => (
            <FormControlLabel
              key={engine._id}
              value={engine.name}
              control={<Radio color="primary" />}
              label={engine.name}
              onChange={() => onEngineSel(engine, index)}
              checked={aa === engine.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
};

export default EnginesFilter;
