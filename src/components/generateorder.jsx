import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";

import "typeface-roboto";


const Generateorder = (props) => {
    const { onOrderCreate } = props;
  //console.log("goOrder -  ", props);


  const [dialogOpen, setDialogOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [theponumber, setTheponumber] = useState("");

  const onDialogOpen = () => {

    setDialogOpen(true);

  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const onConfirm = () => {
    setSnackbarOpen(true);
    setSnackbarMessage(`Order notified`);
    
    onOrderCreate(theponumber);

    onDialogClose();
  };

  

  const onSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <React.Fragment>
      <Button onClick={() => onDialogOpen()}>Generate Order</Button>

      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Generate Order</DialogTitle>
        <DialogContent>
        <p>Please Note - This will raise an official order from this forklift quote</p>
        <p>Please confirm you wish to place an order</p>
        <TextField
            margin="normal"
            label="Please Enter your PO number"
            InputProps={{ name: "theponumber" }}
            onChange={(e) => setTheponumber(e.target.value)}
            value={theponumber}
            fullwidth="true"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose}>Cancel</Button>
          <Button onClick={onConfirm} variant="contained">
            Confirm
          </Button>
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

export default Generateorder;
