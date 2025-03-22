import React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import "typeface-roboto";

const ResetFilters = props => {
  const { onResetFilters } = props;

  return (
    <React.Fragment>
      <Button onClick={() => onResetFilters()}>Reset Filters</Button>
      <br />
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default ResetFilters;
