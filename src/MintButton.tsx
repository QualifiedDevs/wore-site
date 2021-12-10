import React, { useContext } from "react";

import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

import { useWallet } from "@solana/wallet-adapter-react";
import useCandyMachine from "../hooks/useCandyMachine";

import { QuantityContext } from "./ChooseQuantity";

/*
 * Connect Wallet
 * Connect Wallet Hover + Anim
 * Mint Enabled
 * Mint Enabled Hover + Anim
 * Mint Disabled
 * Mint Loading
 * Countdown
 */

const MultiButton = styled((props) => {
  const { connected } = useWallet();
  const { isSoldOut, mintStartDate, isMinting, startMint, startMintMultiple } =
    useCandyMachine();

  const { quantity } = useContext(QuantityContext);

  return (
    <LoadingButton
      variant="contained"
      onClick={(quantity == 1) ? startMint : () => {startMintMultiple(quantity)}}
      disabled={!connected || isMinting || isSoldOut}
      loading={isMinting}
      {...props}
    >
      {!isSoldOut ? props.children : "Sold Out"}
    </LoadingButton>
  );
})``;

export default MultiButton;
