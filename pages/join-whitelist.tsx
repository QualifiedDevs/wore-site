//@ts-nocheck
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";

import { useRouter } from "next/router";

import ConnectButton from "@components/ConnectButton";
import PurchaseUI from "@components/PurchaseUI";
import useWeb3 from "@hooks/useWeb3";

const ValueWindow = styled((props) => {
  const {
    connected,
    connectedAccount,
    maxPerWallet,
    maxSupply,
    totalSupply,
    soldOut,
    mintedBalance,
    isMinting,
    price,
  } = useWeb3();

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

/*
  When an account is connected, we query!
  
  Once we have gotten a response, we wait for the query.
  

*/

function getEntryFromWalletAddress(address: string) {}

function getEntryFromId(uuid: string) {}

import getPurchaseAuth from "@utils/getPurchaseAuth"

const jointWhitelist = styled((props) => {

  const { connected, connectedAccount, whitelistAuth, setWhitelistAuth } = useWeb3();
  const { query, isReady } = useRouter();

  useEffect(() => {
    if (!connectedAccount) {
      setWhitelistAuth(null)
      return
    }
    (async () => {
      // const user = await getEntryFromWalletAddress(connectedAccount);
      // if (!user) {
      //   setWhitelistAuth(null)
      //   return
      // };
      // * Get whitelist auth from server...
      let res;
      try {
        res = await getPurchaseAuth(connectedAccount)
      } catch(err) {
        console.log("ACCOUNT NOT AUTHORIZED")
      }
      setWhitelistAuth(res)      
      // If there is a user request auth with this wallet.
      // If there is not a user then set auth to null.
    })()
  }, [connectedAccount]);

  // useEffect(() => {
    
  // }, [isReady])
  // query, connectedAccount

  return (
    <Box {...props}>
      {connected ? <PurchaseUI /> : <ConnectButton variant="contained" />}
      {/* <ValueWindow className="view" /> */}
    </Box>
  );
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .view {
    background: orange;
  }
`;

export default jointWhitelist;
