import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Sideextractionbatterys = props => {
  const {
    sideextractionbatterys,
    onSideextractionbatterySel,
    selectedSideextractionbattery
  } = props;

  var aa = "X";
  if (selectedSideextractionbattery) {
    aa = selectedSideextractionbattery.sideextractionbatterytype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Side Extraction Battery</FormLabel>

        <RadioGroup
          aria-label="sideextractionbatterys"
          name="sideextractionbatterys"
          row={true}
        >
          {sideextractionbatterys.map(sideextractionbattery => (
            <FormControlLabel
              key={sideextractionbattery._id}
              value={sideextractionbattery.sideextractionbatterytype}
              control={<Radio color="primary" />}
              label={sideextractionbattery.sideextractionbatterytype}
              onChange={() => onSideextractionbatterySel(sideextractionbattery)}
              checked={aa === sideextractionbattery.sideextractionbatterytype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Sideextractionbatterys;
