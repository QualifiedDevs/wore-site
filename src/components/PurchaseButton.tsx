import React, { useState, useCallback, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useAtom } from "jotai";
import {
  contractAtom,
  isMintingAtom,
  usePrice,
  useMaxPurchaseAmount,
  useAmountPurchased,
  useMaxSupply,
  useTotalSupply,
} from "@global/privateSaleContract";
import { useWhitelistAuth } from "@global/auth";
import { signerAtom } from "@global/web3";
import useFeedback from "@hooks/useFeedback";

import formatRes from "@utils/formatRes";

const PurchaseButton = styled(
  ({ quantity, ...props }: { quantity: number }) => {
    const [whitelistAuthResult] = useWhitelistAuth();
    const [isMinting, setIsMinting] = useAtom(isMintingAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [signer] = useAtom(signerAtom);
    const [privateSaleContract] = useAtom(contractAtom);

    const [priceRes] = usePrice();
    const [maxPurchaseAmountRes] = useMaxPurchaseAmount();
    const [amountPurchasedRes] = useAmountPurchased();
    const [maxSupplyRes] = useMaxSupply();
    const [totalSupplyRes] = useTotalSupply();

    const { setSuccess, setError } = useFeedback();

    const [mintAvailable, setMintAvailable] = useState(false);
    useEffect(() => {
      if (!whitelistAuthResult.data) {
        setMintAvailable(false);
        return;
      }

      const price = priceRes.data;
      const maxPurchaseAmount = maxPurchaseAmountRes.data;
      const amountPurchased = amountPurchasedRes.data;
      const maxSupply = maxSupplyRes.data;
      const totalSupply = totalSupplyRes.data;

      const contractLoaded =
        price !== null &&
        maxPurchaseAmount !== null &&
        amountPurchased !== null &&
        maxSupply &&
        totalSupply !== null;

      if (!contractLoaded || !signer) {
        setMintAvailable(false);
        return;
      }

      const availablePurchaseAmount = maxPurchaseAmount.sub(amountPurchased);
      //   const availableMint = maxSupply.sub(totalSupply);
      const availableMint = totalSupply.sub(100).abs();

      if (
        availablePurchaseAmount.lt(quantity) ||
        availableMint.lt(availablePurchaseAmount)
      ) {
        setMintAvailable(false);
        return;
      }
      setMintAvailable(true);
    }, [
      quantity,
      signer,
      priceRes,
      maxPurchaseAmountRes,
      amountPurchasedRes,
      maxSupplyRes,
      totalSupplyRes,
      whitelistAuthResult,
    ]);

    const handleClick = useCallback(async () => {
      if (!mintAvailable) return;
      if (!whitelistAuthResult.data)
        throw "Cannot purchase, missing authorization";
      const { hash, signature } = whitelistAuthResult.data;

      const price = priceRes.data;
      const maxPurchaseAmount = maxPurchaseAmountRes.data;
      const amountPurchased = amountPurchasedRes.data;
      const maxSupply = maxSupplyRes.data;
      const totalSupply = totalSupplyRes.data;

      setIsLoading(true);
      setIsMinting(true);

      try {
        const totalCost = priceRes.data.mul(quantity);

        const [data, err] = await formatRes(
          privateSaleContract.buy(quantity, hash, signature, {
            gasLimit: 250000,
            value: totalCost,
          })
        );
        if (err) throw err;
        setSuccess("Purchase Processed");
      } catch (err) {
        setError(err.message);
      }

      setIsMinting(false);
      setIsLoading(false);
    }, [quantity, priceRes, mintAvailable, signer]);

    return (
      <LoadingButton
        onClick={handleClick}
        loading={isLoading}
        {...props}
        disabled={isMinting || !signer || !mintAvailable}
      >
        Purchase {quantity}
      </LoadingButton>
    );
  }
)`
  display: border-box;

  &.Mui-disabled:not(.MuiLoadingButton-loading) {
    border: 2px solid #757575;
    color: #757575;
  }

  &.MuiLoadingButton-loading {
    background: ${({ theme }) => theme.palette.primary.dark};
    svg {
      color: white;
    }
  }
`;

export default PurchaseButton;
