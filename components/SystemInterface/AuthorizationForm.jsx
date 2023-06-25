import { Button, FormControl, FormHelperText, FormLabel, TextField } from "@mui/material";
import React from "react";
import UseFullContext from "../../lib/useFullContext";

function AuthorizationForm() {
  const mainBoxStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    margin: "15px",
  };
  const elementStyle = { margin: "3px" };
  const context = UseFullContext();
  const { updateUserContext } = context;

  const handleLoginButton = () => {
    updateUserContext({ token: "tokenValueTest" });
  };

  return (
    <div style={mainBoxStyle}>
      <FormControl defaultValue="" required>
        <FormLabel style={{ textAlign: "center" }}>Authorization Form</FormLabel>
        <TextField required style={elementStyle} variant="standard" label="Username" />
        <TextField
          required
          style={elementStyle}
          variant="standard"
          autoComplete="current-password"
          label="Password"
          type="password"
        />
        <Button variant="outlined" style={{ margin: "15px" }} onClick={handleLoginButton}>
          Sign in
        </Button>
        <FormHelperText />
      </FormControl>
    </div>
  );
}

export default AuthorizationForm;
