import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";

const Dualdrive = props => {
  const { dualdrives, onDualdriveSel, selectedDualdrive, selectedTyre } = props;

  var aa = "X";
  if (selectedDualdrive) {
    aa = selectedDualdrive.dualdrivetype;
  }

  function onSolidTyre () {
    /* has Solid tyre been Selected */
    return selectedTyre && selectedTyre.tyretype === 'S/E Tyres' ? true:false;
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
              disabled ={!onSolidTyre()}
              onChange={() => onDualdriveSel(dualdrive)}
              checked={aa === dualdrive.dualdrivetype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      
      
      <p><sup>*</sup>Dual Drive Can only be selected with S/E Solid Tyres</p>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Dualdrive;