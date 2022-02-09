import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Paper, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";

import useFeedback from "@hooks/useFeedback";

import sendInvite from "@utils/sendInvite";

const invite = styled((props) => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { query, isReady } = useRouter();

  const {setSuccess, setError} = useFeedback();

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!isReady) return;
    setIsLoading(true);
    try {
      const res = await sendInvite(query.access as string, address);
      console.log("RESPONSE RECEIVED:", res);
      setSuccess("Email Sent Successfully")
    } catch (err) {
      console.error(err);
      //@ts-ignore
      setError(err.message);
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
      />
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

export default invite;
