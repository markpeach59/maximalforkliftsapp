import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Cabins = props => {
  const { cabins, onCabinSel, selectedCabin, selectedUpsweptexhaust } = props;

  var aa = "";
  if (selectedCabin) {
    aa = selectedCabin.cabinoption;
  }

  function onUpswept () {
    
    return selectedUpsweptexhaust ? true:false;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Cabins</FormLabel>

        <RadioGroup aria-label="cabins" name="cabins" row={true}>
          {cabins.map(cabin => (
            <FormControlLabel
              key={cabin._id}
              value={cabin.cabinoption}
              control={<Radio color="primary" />}
              label={cabin.cabinoption}
              disabled ={onUpswept()}
              onChange={() => onCabinSel(cabin)}
              checked={aa === cabin.cabinoption}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Cabins;
