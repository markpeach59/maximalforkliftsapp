import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { registerUser } from "../services/userService";
import "typeface-roboto";

const RegisterForm = () => {
  const [name, setName] = useState({ value: null, error: false, helperText: null });
  const [email, setEmail] = useState({ value: null, error: false, helperText: null });
  const [password, setPassword] = useState({ value: null, error: false, helperText: null });
  
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      const { data } = await registerUser(
        nameInputRef.current.value,
        emailInputRef.current.value.toLowerCase(),
        passwordInputRef.current.value
      );
      console.log("registered as ", data);
      window.location = "/login";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setEmail({
          ...email,
          error: true,
          helperText: error.response.data
        });
      }
    }
  };

  return (
    <React.Fragment>
      <h1>Registration</h1>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter your full name"
          fullWidth
          autoFocus
          required
          inputRef={nameInputRef}
          error={name.error}
          helperText={name.helperText}
        />
        <TextField
          label="Enter your email"
          fullWidth
          autoFocus
          required
          inputRef={emailInputRef}
          error={email.error}
          helperText={email.helperText}
        />
        <TextField
          label="Enter your password"
          fullWidth
          required
          type="password"
          inputRef={passwordInputRef}
        />
        <Button type="submit" color="primary">
          Register
        </Button>
      </form>
    </React.Fragment>
  );
};

export default RegisterForm;
