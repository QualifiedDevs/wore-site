import React, { useState } from "react";
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

import {
  useAmountPurchased,
  useMaxPurchaseAmount,
  useMaxSupply,
  useTotalSupply,
  usePrice,
} from "@global/privateSaleContract";

import { useWhitelistAuth } from "@global/auth";

const Purchased = styled((props) => {
  const [amountPurchasedRes] = useAmountPurchased();
  const [maxPurchaseAmountRes] = useMaxPurchaseAmount();

  return (
    <Typography {...props}>
      Owned: {amountPurchasedRes.data ? amountPurchasedRes.data.toNumber() : 0}/
      {maxPurchaseAmountRes.data ? maxPurchaseAmountRes.data.toNumber() : 3}
    </Typography>
  );
})``;

const Remaining = styled((props) => {
  const [maxSupplyRes] = useMaxSupply();
  const [totalSupplyRes] = useTotalSupply();

  return (
    <Typography {...props}>
      {totalSupplyRes.loading ? (
        <CircularProgress />
      ) : totalSupplyRes.data ? (
        <>
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
    disabled,
    ...props
  }: {
    quantity: number;
    disabled?: boolean;
  }) => {



    return (
      <Box {...props}>
        <Ticket disabled={disabled} sx={{ mb: 2 }} />
        <PurchaseButton quantity={quantity} variant="contained" />
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
      <Purchased sx={{ mb: 3 }} className="purchased" />
      {/* <Typography variant="h3" sx={{ mb: 5 }}>
        Private Sale {totalSupplyRes.data.toNumber()}/
        {maxSupplyRes.data.toNumber()}
      </Typography> */}
      <Stack direction="row" justifyContent="center" spacing={3} sx={{ mb: 3 }}>
        <TicketPurchase quantity={1} />
        <TicketPurchase quantity={2} />
        <TicketPurchase quantity={3} />
      </Stack>
      {/* @ts-ignore */}
      <Remaining className="remaining" sx={{ mb: 3 }} />
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
