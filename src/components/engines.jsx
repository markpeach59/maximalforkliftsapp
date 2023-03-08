import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";

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
