import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Controller = props => {
  const { controllers, onControllerSel, selectedController } = props;

  var aa = "XX";
  if (selectedController) {
    aa = selectedController.controllertype;
    console.log("AA", aa);
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Controller</FormLabel>

        <RadioGroup
          aria-label="controller"
          name="controller"
          //value={value}
          //onChange={handleChange}
          //onChange={() => onControllerSel(controller)}
          row={true}
        >
          {controllers.map(controller => (
            <FormControlLabel
              key={controller._id}
              value={controller.controllertype}
              control={<Radio color="primary" />}
              label={controller.controllertype}
              //checked ={selectedController === {controller.controllertype}}
              onChange={() => onControllerSel(controller)}
              checked={aa === controller.controllertype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Controller;