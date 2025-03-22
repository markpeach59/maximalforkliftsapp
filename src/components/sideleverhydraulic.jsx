import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Sideleverhydraulics = props => {
  const {
    sideleverhydraulics,
    onSideleverhydraulicSel,
    selectedSideleverhydraulic
  } = props;

  var aa = "X";
  if (selectedSideleverhydraulic) {
    aa = selectedSideleverhydraulic.sideleverhydraulictype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Side Lever Hydraulics</FormLabel>

        <RadioGroup
          aria-label="sideleverhydraulics"
          name="sideleverhydraulics"
          row={true}
        >
          {sideleverhydraulics.map(sideleverhydraulic => (
            <FormControlLabel
              key={sideleverhydraulic._id}
              value={sideleverhydraulic.sideleverhydraulictype}
              control={<Radio color="primary" />}
              label={sideleverhydraulic.sideleverhydraulictype}
              onChange={() => onSideleverhydraulicSel(sideleverhydraulic)}
              checked={aa === sideleverhydraulic.sideleverhydraulictype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Sideleverhydraulics;
