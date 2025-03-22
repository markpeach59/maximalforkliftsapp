import React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import "typeface-roboto";

const ResetOptions = props => {
  const { onResetOptions } = props;

  return (
    <React.Fragment>
      <Button onClick={() => onResetOptions()}>Reset Options</Button>
      <br />
      <Divider />
      <br />
    </React.Fragment>
  );
};

export default ResetOptions;