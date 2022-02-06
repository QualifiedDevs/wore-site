//@ts-nocheck

import React, { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import useWeb3 from "@hooks/useWeb3";
import { BigNumber } from "ethers";

const prices = [500000000000000000, 500000000000000000 * 2, 500000000000000000 * 3]

const PurchaseButton = styled(({ quantity, ...props }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    connectedAccount,
    presaleContract,
    setIsMinting,
    isMinting,
    whitelistAuth,
    signer,
    price,
    mintedBalance,
    
  } = useWeb3();

  async function purchase() {
    //TODO: Attempt purchase from contract with given quantity and signer.
    let res;
    try {
      console.log(price?.toString())
      const { hash, signature } = whitelistAuth!;
      res = await presaleContract.buy(quantity, hash, signature, {
        gasLimit: 250000,
        value: prices[quantity - 1].toString(),
      });
    } catch (err) {
      throw err;
    }
    return res;
  }

  async function handleClick() {
    setIsLoading(true);
    setIsMinting(true);
    let res;
    try {
      if (!whitelistAuth) throw "Cannot Purchase, Missing Authorization";
      res = await purchase();
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
    setIsMinting(false);
  }

  let num = 0;
  if (mintedBalance)
    num = mintedBalance.toNumber()

  return (
    <LoadingButton
      onClick={handleClick}
      loading={isLoading}
      disabled={isMinting || (3 - mintedBalance) < quantity }
      {...props}
    >
      Purchase {quantity}
    </LoadingButton>
  );
})``;

const PurchaseUI = styled((props) => {
  return (
    <Box {...props}>
      <PurchaseButton variant="contained" quantity={1} />
      <PurchaseButton variant="contained" quantity={2} />
      <PurchaseButton variant="contained" quantity={3} />
    </Box>
  );
})``;

export default PurchaseUI;
