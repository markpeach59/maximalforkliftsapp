import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import auth from "../services/authService";

import "typeface-roboto";

const LoginForm = () => {
  const [email, setEmail] = useState({ value: null, error: false, helperText: null });
  
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      await auth.login(
        emailInputRef.current.value.toLowerCase(),
        passwordInputRef.current.value
      );
      
      const { state } = location;
      window.location = state?.from?.pathname || "/forklifts";
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
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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
          Sign in
        </Button>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
