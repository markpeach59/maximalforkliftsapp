import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const ColdStoreProts = props => {
  const { coldstoreprots, onColdStoreProtSel, selectedColdStoreProt } = props;

  var aa = "X";
  if (selectedColdStoreProt) {
    aa = selectedColdStoreProt.coldstoreprottype;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Cold Store Protection</FormLabel>

        <RadioGroup
          aria-label="coldstoreprots"
          name="coldstoreprots"
          row={true}
        >
          {coldstoreprots.map(coldstoreprot => (
            <FormControlLabel
              key={coldstoreprot._id}
              value={coldstoreprot.coldstoreprottype}
              control={<Radio color="primary" />}
              label={coldstoreprot.coldstoreprottype}
              onChange={() => onColdStoreProtSel(coldstoreprot)}
              checked={aa === coldstoreprot.coldstoreprottype}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default ColdStoreProts;
