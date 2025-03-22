import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";

import OptionImg from "./optionimg";

import "typeface-roboto";


const Viewseats = (props) => {
   
  const [dialogOpen, setDialogOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onDialogOpen = () => {

    setDialogOpen(true);

  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  

  const onSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <React.Fragment>
      <Button onClick={() => onDialogOpen()}>View Seat Options</Button>

      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Available Seat Options</DialogTitle>
        <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={4}>
<OptionImg imgName="StandardSeat.jpg" />
<h6>Standard</h6>
</Grid>
<Grid item xs={4}>
<OptionImg imgName="SuspensionSeat.jpg" />
<h6>Suspension</h6>
</Grid><Grid item xs={4}>
<OptionImg imgName="SuspensionSeatWithArms.jpg" />
<h6>Suspension with Arms</h6>
            </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose}>Close</Button>
          
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={onSnackbarClose}
        autoHideDuration={4000}
      />
    </React.Fragment>
  );
};

export default Viewseats;