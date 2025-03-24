import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { registerDealer } from "../services/dealerService";
import "typeface-roboto";

const RegisterDealerForm = () => {
  const [dealername, setDealername] = useState({ value: null, error: false, helperText: null });
  
  const dealernameInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      const { data } = await registerDealer(dealernameInputRef.current.value);
      console.log("registered as ", data);
    } catch (error) {
      if (error.response) {
        setDealername({
          ...dealername,
          error: true,
          helperText: error.response.data
        });
      }
      console.log("here", error);
    }
  };

  return (
    <React.Fragment>
      <h1>Dealer Registration</h1>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Dealer Name"
          fullWidth
          autoFocus
          required
          inputRef={dealernameInputRef}
          error={dealername.error}
          helperText={dealername.helperText}
        />

        <Button type="submit" color="primary">
          Register
        </Button>
      </form>
    </React.Fragment>
  );
};

export default RegisterDealerForm;
