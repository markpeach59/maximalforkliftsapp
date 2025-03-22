import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Precleaners = props => {
  const { precleaners, onPrecleanerSel, selectedPrecleaner } = props;

  var aa = "X";
  if (selectedPrecleaner) {
    aa = selectedPrecleaner.precleanertype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Pre Cleaner</FormLabel>

        <RadioGroup aria-label="precleaners" name="precleaners" row={true}>
          {precleaners.map(precleaner => (
            <FormControlLabel
              key={precleaner._id}
              value={precleaner.heatertype}
              control={<Radio color="primary" />}
              label={precleaner.precleanertype}
              onChange={() => onPrecleanerSel(precleaner)}
              checked={aa === precleaner.precleanertype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Precleaners;