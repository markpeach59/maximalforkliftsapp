import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";

import "typeface-roboto";
import TextField from "@mui/material/TextField";

const Confirmorder = (props) => {
   
  const {orderid, onConfirmorder } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [thestocknumber, setThestocknumber] = useState(0);

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const onConfirm = () => {
    setSnackbarOpen(true);
    setSnackbarMessage(`Setting Order as Confirmed`);
    // need to handle confirmation
    onConfirmorder(orderid, thestocknumber);
    onDialogClose();
  };

  

  const onSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <React.Fragment>
      <Button onClick={() => onDialogOpen()}>Confirm Order</Button>

      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Confirm Order to Dealer</DialogTitle>
        <DialogContent>
        <TextField
            margin="normal"
            label="Please Enter Stock Number"
            InputProps={{ name: "thestocknumber" }}
            onChange={(e) => setThestocknumber(e.target.value)}
            value={thestocknumber}
            fullwidth="true"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose}>Cancel</Button>
          
          <Button onClick={onConfirm} disabled={!thestocknumber} variant="contained">
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

export default Confirmorder;
