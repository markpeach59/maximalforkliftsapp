import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";

import ForkliftImg from "./forkliftimg";

import "typeface-roboto";

import Typography from "@mui/material/Typography";

const ViewOfferBox = (props) => {
   
  const [dialogOpen, setDialogOpen] = useState(true); // set to true so it opens immmediately

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
      <Button color="inherit" onClick={() => onDialogOpen()}>Offer</Button>

      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Special Offer</DialogTitle>
        <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
          <h2>FD35T-C2W</h2>
          <ForkliftImg imgName="M-SERIES-ROUGH-TERRAIN-18T-25T-35T-2WD.png" />
          <React.Fragment>
        <p>Rough Terrain Kubota 2607 Euro 5 Capacity : 3500Kg<br />3 Stage Full Free Lift Mast 4350mm,2330mm Closed,1450mm Free Lift<br />3rd Valve, 1200mm Forks, Integral Side Shift<br />Pneumatic Tyres, Safety Blue Spot, Full Comfort Suspension Seat<br /> OPS Safety System, Amber Beacon, Reverse Alarm, Full LED Lighting<br /><br /><strong>Normal Dealer Price : £23244</strong></p> 
        <Typography sx={{ color: 'red' }} align="center">Special Offer Price &pound;19,100 each<br />Only 2 left</Typography>
         
         </React.Fragment>
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

export default ViewOfferBox;
