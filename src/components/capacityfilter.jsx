import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "typeface-roboto";

const CapacityFilter = props => {
  const {
    capacityfilters,
    onCapacityFilterSel,
    selectedCapacityFilter
  } = props;

  var aa = "";
  if (selectedCapacityFilter) {
    aa = selectedCapacityFilter.capFilter;
  }

  return (
    <React.Fragment>
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Max Load Capacity</FormLabel>

        <RadioGroup
          aria-label="loadcapcity"
          name="loadcapacity"
          //value={value}
          //onChange={handleChange}
          row={true}
        >
          {capacityfilters.map((capacityfilter, index) => (
            <FormControlLabel
              key={capacityfilter._id}
              value={capacityfilter.capFilter}
              control={<Radio color="primary" />}
              label={capacityfilter.capFilter}
              onChange={() => onCapacityFilterSel(capacityfilter, index)}
              checked={aa === capacityfilter.capFilter}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
};

export default CapacityFilter;
