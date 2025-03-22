import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";

import "typeface-roboto";
import TextField from "@mui/material/TextField";

const Markup = (props) => {
  const {currentMarkup, onMarkup } = props;

  //console.log("Markup Props ", props);

  //console.log( 'Inital Markup - ', currentMarkup);

  const [themarkup, setThemarkup] = useState(0);



  //console.log( 'The Markup - ', themarkup);
 

  const [dialogOpen, setDialogOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onDialogOpen = () => {
    
    setThemarkup(currentMarkup);

    setDialogOpen(true);

  };

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const onSave = () => {
    setSnackbarOpen(true);
    setSnackbarMessage(`Markup of £${themarkup} Saved`);
    onMarkup(themarkup);
    onDialogClose();
  };

  const onReset = () => {
    setThemarkup(0);
    setSnackbarOpen(true);
    setSnackbarMessage(`Markup Reset to Zero`);
    onMarkup(0);
  };

  const onSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <React.Fragment>
      <Button onClick={() => onDialogOpen()}>Quote Markup</Button>

      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle>Quote Markup</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Markup Amount"
            InputProps={{ name: "themarkup" }}
            onChange={(e) => setThemarkup(e.target.value)}
            value={themarkup}
            fullwidth="true"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose}>Cancel</Button>
          <Button onClick={onReset}>Reset</Button>
          <Button onClick={onSave} variant="contained">
            Save
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

export default Markup;
