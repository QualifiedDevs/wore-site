import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import signup from "@utils/signup";

const DataForm = styled((props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signup(email, discord, (walletAddress !== "")? walletAddress : undefined);
      console.log("RESPONSE RECEIVED:", res);
    } catch (err) {
      console.log("SUBMIT FAILED", err);
    }
    setIsLoading(false);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} {...props}>
      <TextField
        required
        label="EMAIL"
        placeholder="worewolf@wolfofrealestate.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        required
        label="DISCORD"
        placeholder="worewolf#1184"
        value={discord}
        onChange={(e) => {
          setDiscord(e.target.value);
        }}
      />
      <TextField
        label="WALLET ADDRESS"
        placeholder="0x1cd7840181b4142C336F3E69d1E58d3f38330D9C"
        value={walletAddress}
        onChange={(e) => {
          setWalletAddress(e.target.value);
        }}
      />
      <LoadingButton type="submit" loading={isLoading} variant="contained">
        Submit
      </LoadingButton>
    </Box>
  );
})`
  display: grid;
  width: 420px;
  grid-template-rows: 1fr;
  grid-row-gap: 1em;

  .MuiButton-root,
  .MuiTextField-root {

  }

  .MuiButton-root {

    &.MuiLoadingButton-loading {
        background: #8B8B8B;
    }

  }

  .MuiTextField-root {
  }
`;

export default DataForm;
