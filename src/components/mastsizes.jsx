import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const MastSizes = props => {
  const { mastsizes, onMastSizeSel, selectedMastSize } = props;

  var aa = "";
  if (selectedMastSize) {
    aa = selectedMastSize.length;
    //console.log("AXA");
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Mast Size</FormLabel>

        <RadioGroup
          aria-label="mastsize"
          name="mastsize"
          //value={value}
          //onChange={handleChange}
          //onClick={() => onMastSizeSel(mastsize)}
        >
          {mastsizes.map(mastsize => (
            <FormControlLabel
              key={mastsize._id}
              value={mastsize.length}
              control={<Radio color="primary" />}
              label={mastsize.length}
              checked={aa === mastsize.length}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
};

export default MastSizes;
