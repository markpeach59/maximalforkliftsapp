import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Heavydutyairfilters = props => {
  const { heavydutyairfilters, onHeavydutyairfilterSel, selectedHeavydutyairfilter } = props;

  var aa = "X";
  if (selectedHeavydutyairfilter) {
    aa = selectedHeavydutyairfilter.heavydutyairfiltertype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Heavy Duty Air Filter</FormLabel>

        <RadioGroup aria-label="heavydutyairfilters" name="heavydutyairfilters" row={true}>
          {heavydutyairfilters.map(heavydutyairfilter => (
            <FormControlLabel
              key={heavydutyairfilter._id}
              value={heavydutyairfilter.heavydutyairfiltertype}
              control={<Radio color="primary" />}
              label={heavydutyairfilter.heavydutyairfiltertype}
              onChange={() => onHeavydutyairfilterSel(heavydutyairfilter)}
              checked={aa === heavydutyairfilter.heavydutyairfiltertype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Heavydutyairfilters;