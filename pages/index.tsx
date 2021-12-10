import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { Container, Box, Typography } from "@mui/material";

import Image from "next/image";
import mockup1 from "../public/mockup1.png";
import mockup2 from "../public/mockup2.png";
import mockup3 from "../public/mockup3.png";

import Header from "../src/Header";
import ChooseQuantity, {
  QuantityProvider,
  QuantityContext,
} from "../src/ChooseQuantity";
import MultiButton from "../src/MultiButton";

import useCandyMachine from "../hooks/useCandyMachine";

//  Displays Mint Status: "Coming Soon | Mint Started | Sold Out"
const MintStatus = styled((props) => {
  //TODO: display data based on candymachine state
  return <Typography {...props}>Mint Started</Typography>;
})``;

//  Displays Amount Left to Mint out of Total Supply
const Quantity = styled((props) => {
  // TODO: get data from candymachine
  const {nftsData: {itemsRemaining, itemsAvailable}} = useCandyMachine();
  return <Typography {...props}>Minted: {itemsRemaining}/{itemsAvailable}</Typography>;
})``;

const Mockup = styled((props) => {
  return (
    <Box {...props}>
      <Image src={props.src} />
    </Box>
  );
})``;

const Mockups = styled((props) => {
  return (
    <Box {...props}>
      <Mockup src={mockup1} sx={{transform: "translate(12%, 0)"}}/>
      <Mockup src={mockup2} sx={{ zIndex: 1 }} />
      <Mockup src={mockup3} sx={{transform: "translate(-12%, 0)"}}/>
    </Box>
  );
})`
  display: flex;
  justify-content: center;
`;

//Displays Total Price based on Quantity Selected
const TotalPrice = styled((props) => {
  const price = 2;
  const { quantity } = useContext(QuantityContext);
  //TODO: Display price based on mint supply selected, provided by react context?
  return (
    <Box {...props}>
      <Typography>Total</Typography>
      <Typography>{quantity * price} SOL</Typography>
    </Box>
  );
})`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const index = styled((props) => {
  return (
    <QuantityProvider>
      <Container maxWidth="contentBox" disableGutters {...props}>
        <Header sx={{ mb: 8 }} />
        <Typography variant="h1" color="text.secondary" className="title">
          The <b>Boss Bulls</b> <span className="tm">™</span> Club
        </Typography>
        <Typography variant="subtitle1" className="subtitle">
          An Ultra-Realistic 3D Generative NFT on Solana
        </Typography>
        <MintStatus
          variant="h2"
          color="text.secondary"
          sx={{ mb: 2 }}
          className="mint-status"
        />
        <Box className="content">
          <Typography className="price-per" color="#908f95">
            Price per NFT <b>2 SOL Each</b>
          </Typography>
          <Quantity
            color="#908f95"
            sx={{ mb: 2 }}
            className="quantity-minted"
          />
          <Mockups sx={{ mb: 2 }} className="mockups" />
          <ChooseQuantity sx={{ my: 1 }} />
          <Box className="price-total">
            <TotalPrice />
          </Box>
          <MultiButton variant="contained" color="button" sx={{ my: 2 }} />
        </Box>
      </Container>
    </QuantityProvider>
  );
})`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title,
  .subtitle,
  .mint-status {
    text-transform: uppercase;
  }

  .title,
  .mint-status {
    font-size: 4.5rem;
  }

  .title {
    b {
      color: ${({ theme }) => {
        return theme.palette.text.primary;
      }};
    }
  }

  .subtitle {
    transform: translate(0, -10px);
  }

  .mint-status {
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;

    background: #09090a;
    border: 2px solid #908f95;
    border-radius: 20px;

    .price-per {
      font-size: 1.2rem;
      b {
        color: ${({ theme }) => {
          return theme.palette.text.primary;
        }};
        margin-left: 1em;
        font-size: 2rem;
      }
    }

    .quantity-minted {
      transform: translate(0, -10px);
      font-size: 1.2rem;
    }

    .mockups {
      width: 80%;
    }

    .price-total {
      border: 2px solid #c4c4c4;
      border-right-width: 0;
      border-left-width: 0;
      width: 99%;
      padding: 0.2rem 2rem;
    }
  }

  .multi-button {
  }
`;

export default index;
