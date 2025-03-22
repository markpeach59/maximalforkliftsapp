import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Platforms = props => {
  const { platforms, onPlatformSel, selectedPlatform } = props;

  var aa = "X";
  if (selectedPlatform) {
    aa = selectedPlatform.platformtype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Platform</FormLabel>

        <RadioGroup aria-label="platforms" name="platforms" row={true}>
          {platforms.map(platform => (
            <FormControlLabel
              key={platform._id}
              value={platform.platformtype}
              control={<Radio color="primary" />}
              label={platform.platformtype}
              onChange={() => onPlatformSel(platform)}
              checked={aa === platform.platformtype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Platforms;
