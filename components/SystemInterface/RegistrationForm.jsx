import { Button, FormControl, FormHelperText, FormLabel, TextField } from "@mui/material";
import React from "react";

function RegistrationForm() {
  const mainBoxStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    margin: "5px",
  };
  const elementStyle = { margin: "3px" };

  return (
    <div style={mainBoxStyle}>
      <FormControl defaultValue="" required>
        <FormLabel style={{ textAlign: "center" }}>Registration Form</FormLabel>
        <TextField style={elementStyle} variant="standard" label="First Name" />
        <TextField style={elementStyle} variant="standard" label="Last Name" />
        <TextField style={elementStyle} variant="standard" label="Username" />
        <TextField style={elementStyle} variant="standard" label="Email" />
        <TextField style={elementStyle} variant="standard" label="Password" type="password" />
        <TextField style={elementStyle} variant="standard" label="Retry password" type="password" />
        <Button variant="outlined" style={{ margin: "15px" }}>
          Sign up
        </Button>
        <FormHelperText />
      </FormControl>
    </div>
  );
}

export default RegistrationForm;
