import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Paper, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import sendInvite from "@utils/sendInvite";

// ! Catch the form submit event. Prevent shit from going down!

const Invite = styled((props) => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: any) {
      e.preventDefault()
    setIsLoading(true);
    try {
    console.log("caling sendInvite")
      const res = await sendInvite(address);
      console.log("RESPONSE RECEIVED:", res);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} {...props}>
      <TextField
        variant="outlined"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      ></TextField>
      <LoadingButton
        type="submit"
        loading={isLoading}
        disabled={address === ""}
        variant="contained"
      >
        Submit
      </LoadingButton>
    </Box>
  );
})`
  display: flex;
  flex-direction: column;

  .MuiTextField-root {
  }
`;

// Pressing enter should also submit!

export default Invite;

/*
  TextField:
  -FormControl
  -Input
  -FilledInput
  -InputLabel
  -OutlinedInput
  -FormHelperText

  FormControl and useFormControl
*/
