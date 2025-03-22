import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Displaywithcamera = props => {
  const { displaywithcameras, onDisplaywithcameraSel, selectedDisplaywithcamera } = props;

  var aa = "XX";
  if (selectedDisplaywithcamera) {
    aa = selectedDisplaywithcamera.displaywithcameratype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Display with Camera</FormLabel>

        <RadioGroup aria-label="displaywithcameras" name="displaywithcameras" row={true}>
          {displaywithcameras.map(displaywithcamera => (
            <FormControlLabel
              key={displaywithcamera._id}
              value={displaywithcamera.displaywithcameratype}
              control={<Radio color="primary" />}
              label={displaywithcamera.displaywithcameratype}
              onChange={() => onDisplaywithcameraSel(displaywithcamera)}
              checked={aa === displaywithcamera.displaywithcameratype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Displaywithcamera;
