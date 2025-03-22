import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Seats = props => {
  const { seats, onSeatSel, selectedSeat } = props;

  var aa = "";
  if (selectedSeat) {
    aa = selectedSeat.seattype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Seats</FormLabel>

        <RadioGroup aria-label="seats" name="seats" row={true}>
          {seats.map(seat => (
            <FormControlLabel
              key={seat._id}
              value={seat.seattype}
              control={<Radio color="primary" />}
              label={seat.seattype}
              onChange={() => onSeatSel(seat)}
              checked={aa === seat.seattype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Seats;
