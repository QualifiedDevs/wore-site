//@ts-nocheck

import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import web3Modal from "@utils/web3Modal";

import useFeedback from "@hooks/useFeedback";

import useWeb3 from "@hooks/useWeb3";
import { ethers } from "ethers";

import isClient from "@utils/isClient";

/*
  Whenever a wallet connects:
    -Check in the database for the wallet address. If it exists, they are authorized.
    -If no wallet exists, search for the bearer token. If it exists, update the attached wallet.
    -If the first checks pass, send whitelist authorization and continue with fetching blockchain data.
    -If the checks do NOT pass, prompt them to connect a different wallet 

    I can do useEffect for when they connect. 
*/

const ConnectButton = styled((props) => {
  const { setProvider, connected } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  const {setSuccess, setError} = useFeedback()

  async function handleClick() {
    setIsLoading(true);
    let res;
    try {
      res = await web3Modal!.connect();
      const provider = new ethers.providers.Web3Provider(res);
      console.log("Connection Successful");
      setProvider(provider);
    } catch (err) {
      console.error(err);
      //@ts-ignore
      setError(err.message)
    }
    setIsLoading(false);
  }

  return (
    <LoadingButton
      onClick={handleClick}
      loading={isLoading}
      disabled={connected}
      {...props}
    >
      {connected ? "Wallet Connected" : "Connect Wallet"}
    </LoadingButton>
  );
})``;

export default ConnectButton;