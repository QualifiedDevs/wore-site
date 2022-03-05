import React, { useState, useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";

import Ticket from "@components/Ticket";
import ConnectWallet from "@components/ConnectWallet";
import PurchaseButton from "@components/PurchaseButton";

//disclaimer: If you are purchasing on the private sale, it is highly recommended that you use a desktop or laptop, and not a mobile device.
//backwards countdown

import { useAtom } from "jotai";

import { whitelistAuthResult } from "@global/auth";

import { signerAtom } from "@global/web3";

import {
  useAmountPurchased,
  useMaxPurchaseAmount,
  useMaxSupply,
  useTotalSupply,
  usePrice,
  isMintingAtom,
} from "@global/privateSaleContract";

import { useWhitelistAuth } from "@global/auth";
import { ProductionQuantityLimits } from "@mui/icons-material";

const Purchased = styled((props) => {
  const [amountPurchasedRes] = useAmountPurchased();
  const [maxPurchaseAmountRes] = useMaxPurchaseAmount();

  return (
    <Typography {...props}>
      {/* @ts-ignore */}
      Owned: {amountPurchasedRes.data ? amountPurchasedRes.data.toNumber() : 0}/
      {/* @ts-ignore */}
      {maxPurchaseAmountRes.data ? maxPurchaseAmountRes.data.toNumber() : 3}
    </Typography>
  );
})``;

const Remaining = styled((props) => {
  const [maxSupplyRes] = useMaxSupply();
  const [totalSupplyRes] = useTotalSupply();

  return (
    <Typography {...props}>
      {/* @ts-ignore */}
      {totalSupplyRes.loading ? (
        <CircularProgress />
      ) : //@ts-ignore
      totalSupplyRes.data ? (
        <>
          {/* @ts-ignore */}
          <b>{totalSupplyRes.data.sub(100).abs().toString()}</b> Tickets
          Remaining
        </>
      ) : null}
    </Typography>
  );
})``;

const TicketPurchase = styled(
  ({
    quantity,
    quantityFocused,
    setQuantityFocused,
    ...props
  }: {
    quantity: number;
    disabled?: boolean;
    quantityFocused: number;
    setQuantityFocused: React.Dispatch<number>;
  }) => {
    const [amountPurchasedRes] = useAmountPurchased();

    const handleFocus = (e: any) => {
      setQuantityFocused(quantity);
    };

    const handleFocusLeave = (e: any) => {
      setQuantityFocused(0);
    };

    return (
      <Box {...props}>
        <Ticket
          active={
            //@ts-ignore
            (amountPurchasedRes.data !== null &&
              //@ts-ignore
              quantity > 3 - amountPurchasedRes.data.toNumber()) ||
            quantityFocused >= quantity
          }
          sx={{ mb: 2 }}
        />
        {/* @ts-ignore */}
        <PurchaseButton
          quantity={quantity}
          //@ts-ignore
          variant="contained"
          onMouseOver={handleFocus}
          onMouseLeave={handleFocusLeave}
        />
      </Box>
    );
  }
)`
  .MuiButton-root {
    width: 95%;
  }
`;

const Debug = styled((props) => {
  const [amountPurchasedRes] = useAmountPurchased();
  const [maxPurchaseAmountRes] = useMaxPurchaseAmount();
  const [maxSupplyRes] = useMaxSupply();
  const [totalSupplyRes] = useTotalSupply();
  const [priceRes] = usePrice();
  const [whitelistAuthResult] = useWhitelistAuth();

  return (
    <Paper {...props}>
      <Typography>
        amountPurchased: {JSON.stringify(amountPurchasedRes)}
      </Typography>
      <Typography>
        maxPurchaseAmount: {JSON.stringify(maxPurchaseAmountRes)}
      </Typography>
      <Typography>maxSupply: {JSON.stringify(maxSupplyRes)}</Typography>
      <Typography>totalSupply: {JSON.stringify(totalSupplyRes)}</Typography>
      <Typography>price: {JSON.stringify(priceRes)}</Typography>
      <Typography>
        whitelist auth: {JSON.stringify(whitelistAuthResult)}
      </Typography>
    </Paper>
  );
})`
  background: gray;
  padding: 1em;
`;

const PrivateSale = styled(({ ...props }: { id: string }) => {
  const [maxSupplyRes] = useMaxSupply();
  const [totalSupplyRes] = useTotalSupply();

  const [quantityFocused, setQuantityFocused] = useState<number>(0);

  const tickets = useMemo(() => {
    return Array(3)
      .fill(null)
      .map((__, index: number) => (
        <TicketPurchase
          quantity={index + 1}
          key={index}
          quantityFocused={quantityFocused}
          setQuantityFocused={setQuantityFocused}
        />
      ));
  }, [quantityFocused]);

  return (
    <Container
      component={Stack}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Typography variant="h3" sx={{ mb: 4 }}>
        Private Sale
      </Typography>
      {/* @ts-ignore */}
      <Purchased sx={{ mb: 3 }} className="purchased" />
      {/* <Typography variant="h3" sx={{ mb: 5 }}>
        Private Sale {totalSupplyRes.data.toNumber()}/
        {maxSupplyRes.data.toNumber()}
      </Typography> */}
      <Stack direction="row" justifyContent="center" spacing={3} sx={{ mb: 3 }}>
        {tickets}
      </Stack>
      {/* @ts-ignore */}
      <Remaining className="remaining" sx={{ mb: 3 }} />
      {/* @ts-ignore */}
      <ConnectWallet variant="contained" sx={{ py: 2, px: 6 }} />
      {/* <Debug /> */}
    </Container>
  );
})`
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;

  .purchased {
    font-size: 1.5rem;
  }

  .remaining {
    font-size: 2em;
    b {
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export default PrivateSale;
