//@ts-nocheck
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography, Button } from "@mui/material";

import { useRouter } from "next/router";

import ConnectButton from "@components/ConnectButton";
import PurchaseUI from "@components/PurchaseUI";
import useWeb3 from "@hooks/useWeb3";

import { WORELogoIcon } from "@components/Branding";

import Ticket from "@components/Ticket"

const PurchaseButton = styled((props) => {
  return (
    <Button {...props}>
      
    </Button>
  );
})``;


const PurchaseTicket = styled((props) => {
  return (
    <Box {...props}>
      <Ticket />
      <PurchaseButton />
    </Box>
  );
})``;


const ValueWindow = styled((props) => {


  return (
    <Paper {...props}>
      <Typography>{`connected: ${connected}`}</Typography>
      <Typography>{`connectedAccount: ${connectedAccount}`}</Typography>
      <Typography>{`maxPerWallet: ${maxPerWallet}`}</Typography>
      <Typography>{`maxSupply: ${maxSupply}`}</Typography>
      <Typography>{`totalSupply: ${totalSupply}`}</Typography>
      <Typography>{`soldOut: ${soldOut}`}</Typography>
      <Typography>{`mintedBalance: ${mintedBalance}`}</Typography>
      <Typography>{`isMinting: ${isMinting}`}</Typography>
      <Typography>{`price: ${price}`}</Typography>
    </Paper>
  );
})``;

import getPurchaseAuth from "@utils/getPurchaseAuth";

import Ticket from "@components/Ticket";

const joinWhitelist = styled((props) => {
  const { connected, connectedAccount, whitelistAuth, setWhitelistAuth } =
    useWeb3();
  const { query, isReady } = useRouter();

  useEffect(() => {
    setWhitelistAuth(undefined);
    if (!connectedAccount || !isReady) return;
    (async () => {
      // * Get whitelist auth from server...
      let res;
      try {
        res = await getPurchaseAuth(connectedAccount, query.access);
      } catch (err) {
        console.log("ACCOUNT NOT AUTHORIZED");
      }
      setWhitelistAuth(res);
    })();
  }, [connectedAccount, isReady]);

  return (
    <Box {...props}>
      <WORELogoIcon className="logo" sx={{ mb: 4 }} />
      {connected ? (
        whitelistAuth ? (
          <PurchaseUI />
        ) : whitelistAuth === undefined ? (
          "Fetching Authorization..."
        ) : (
          "NOT AUTHORIZED"
        )
      ) : (
        <ConnectButton variant="contained" />
      )}
      {/* <ValueWindow className="view" /> */}
    </Box>
  );
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .logo {
    width: 100px;
  }

  .view {
    background: orange;
  }
`;

export default joinWhitelist;