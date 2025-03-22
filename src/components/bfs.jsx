import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const Bfs = props => {
  const { bfss, onBfsSel, selectedBfs } = props;

  var aa = "X";
  if (selectedBfs) {
    aa = selectedBfs.bfstype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">BFS</FormLabel>

        <RadioGroup aria-label="bfss" name="bfss" row={true}>
          {bfss.map(bfs => (
            <FormControlLabel
              key={bfs._id}
              value={bfs.bfstype}
              control={<Radio color="primary" />}
              label={bfs.bfstype}
              onChange={() => onBfsSel(bfs)}
              checked={aa === bfs.bfstype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default Bfs;
