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
  Alert,
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
          {/* <b>{totalSupplyRes.data.sub(100).abs().toString()}</b> Tokens
          Remaining */}
          Presale is Live!
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

const WhitelistStatusModal = styled((props) => {
  const [whitelistAuthRes] = useWhitelistAuth();

  return (
    <Box sx={{ display: "none" }} {...props}>
      {/* @ts-ignore */}
      {whitelistAuthRes.loading && <CircularProgress />}
      {/* @ts-ignore */}
      {!whitelistAuthRes.loading && !whitelistAuthRes.data && (
        <Typography>
          You must be whitelisted to join the private sale.
        </Typography>
      )}
    </Box>
  );
})`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: ${({ theme }) => theme.palette.background.default}c0;
  text-align: center;

  display: grid;
  place-items: center;
`;

const PrivateSale = styled(({ ...props }: { id: string }) => {
  const [maxSupplyRes] = useMaxSupply();
  const [totalSupplyRes] = useTotalSupply();

  const [signer] = useAtom(signerAtom);

  const [quantityFocused, setQuantityFocused] = useState<number>(0);
  const [whitelistAuthRes] = useWhitelistAuth();

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
      maxWidth="md"
      {...props}
    >
      {/* @ts-ignore */}
      {signer && !whitelistAuthRes.data && <WhitelistStatusModal />}
      <Typography variant="h3" sx={{ mb: 0.5 }}>
        Preorder
      </Typography>
      <Typography className="description" sx={{ mb: 2 }}>
        {/* There will be a limit of 400 Gen 0 for the presale.
        <br />
        Presale Token holders will be Airdropped NFT upon launch & avoid gas
        fees upon mint. */}
        There are 100 Preorder Tickets available. Each ticket gets redeemed for
        3 W.O.R.E. NFT's upon Mint.
        <br />
        Maximum 3 tickets per person (9 W.O.R.E. NFT's).
        <br />
        Presale Ticket holders will be Airdropped NFT upon launch & avoid gas
        fees upon mint.
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
      <Alert
        className="mobile-notice"
        severity="info"
        color="warning"
        variant="filled"
        sx={{ mb: 2 }}
      >
        If you are purchasing tokens from the private sale, it is highly
        recommended that you use a desktop or laptop, and not a mobile device.
      </Alert>
      {/* @ts-ignore */}
      <Remaining className="remaining" sx={{ mb: 3 }} />
      {/* @ts-ignore */}
      <ConnectWallet variant="contained" sx={{ py: 2, px: 6 }} />
      {/* <Debug /> */}
    </Container>
  );
})`
  position: relative;
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

  .mobile-notice {
    display: none;
  }

  @media screen and (max-aspect-ratio: 1) {
    .mobile-notice {
      display: flex;
      align-items: center;
    }
  }

  .description {
    font-size: 0.8em;
    opacity: 60%;
  }
`;

export default PrivateSale;
