import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import { useRouter } from "next/router";

const joinWhitelist = styled((props) => {
  const { query, isReady } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    // redirect user to index with same query params
  }, [isReady])

  return <Box {...props}>

  </Box>;
})``;

export default joinWhitelist;
