import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const SideShift = props => {
  const { sideshifts, onSideShiftSel, selectedSideShift } = props;

  var aa = "X";
  if (selectedSideShift) {
    aa = selectedSideShift.sideshifttype;
    console.log("AA", selectedSideShift.sideshifttype);
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Side Shift</FormLabel>

        <RadioGroup
          aria-label="sideshift"
          name="sideshift"
          //value={value}
          //onChange={handleChange}
          //onChange={() => onSideShiftSel(sideshift)}
          row={true}
        >
          {sideshifts.map(sideshift => (
            <FormControlLabel
              key={sideshift._id}
              value={sideshift.sideshifttype}
              control={<Radio color="primary" />}
              label={sideshift.sideshifttype}
              //checked ={selectedSideShift === {sideshift.sideshifttype}}
              onChange={() => onSideShiftSel(sideshift)}
              checked={aa === sideshift.sideshifttype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default SideShift;
