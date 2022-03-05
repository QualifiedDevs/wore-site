//@ts-nocheck

import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import web3Modal from "@utils/web3Modal";

import useFeedback from "@hooks/useFeedback";

import useWeb3 from "@hooks/useWeb3";
import { ethers } from "ethers";

import isClient from "@utils/isClient";

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