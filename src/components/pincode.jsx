import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Pincode = props => {
  const { pincodes, onPincodeSel, selectedPincode } = props;

  var aa = "X";
  if (selectedPincode) {
    aa = selectedPincode.pincodetype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Pincode</FormLabel>

        <RadioGroup aria-label="pincodes" name="pincodes" row={true}>
          {pincodes.map(pincode => (
            <FormControlLabel
              key={pincode._id}
              value={pincode.pincodetype}
              control={<Radio color="primary" />}
              label={pincode.pincodetype}
              onChange={() => onPincodeSel(pincode)}
              checked={aa === pincode.pincodetype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Pincode;