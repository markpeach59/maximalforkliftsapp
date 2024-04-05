import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";

const Dualdrive = props => {
  const { dualdrives, onDualdriveSel, selectedDualdrive } = props;

  var aa = "X";
  if (selectedDualdrive) {
    aa = selectedDualdrive.dualdrivetype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Dual Drive</FormLabel>

        <RadioGroup aria-label="dualdrives" name="dualdrives" row={true}>
          {dualdrives.map(dualdrive => (
            <FormControlLabel
              key={dualdrive._id}
              value={dualdrive.dualdrivetype}
              control={<Radio color="primary" />}
              label={dualdrive.dualdrivetype}
              onChange={() => onDualdriveSel(dualdrive)}
              checked={aa === dualdrive.dualdrivetype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Dualdrive;