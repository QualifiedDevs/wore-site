import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import signup from "@utils/signup";

enum SubmitState {
  NONE = 0,
  SUBMITTED,
}

const DataForm = styled((props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitState, setSubmitState] = useState(SubmitState.NONE);

  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signup(
        email,
        discord,
        walletAddress !== "" ? walletAddress : undefined
      );
      console.log("RESPONSE RECEIVED:", res);
    } catch (err) {
      console.log("SUBMIT FAILED", err);
    }
    setIsLoading(false);
    setSubmitState(SubmitState.SUBMITTED);
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
          setSubmitState(SubmitState.NONE);
        }}
      />
      <TextField
        required
        label="DISCORD"
        placeholder="worewolf#1184"
        value={discord}
        onChange={(e) => {
          setDiscord(e.target.value);
          setSubmitState(SubmitState.NONE);
        }}
      />
      <TextField
        label="WALLET ADDRESS"
        placeholder="0x1cd7840181b4142C336F3E69d1E58d3f38330D9C"
        value={walletAddress}
        onChange={(e) => {
          setWalletAddress(e.target.value);
          setSubmitState(SubmitState.NONE);
        }}
      />
      <LoadingButton type="submit" loading={isLoading} variant="contained">
        {submitState === SubmitState.SUBMITTED ? "Submitted" : "Submit"}
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
    backround: black;
  }

  .MuiTextField-root {
    background: black;
  }

  .MuiButton-root {
    color: #222222;
    padding: 0.25em 0;
    font-size: 1.5rem;

    &.MuiLoadingButton-loading {
      background: #8b8b8b;
      color: transparent !important;
    }

    &.MuiButton-disabled {
    }
  }

  .MuiTextField-root {
  }
`;

export default DataForm;
