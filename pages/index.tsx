import { styled } from "@mui/material/styles";
import { Container, Box, Typography } from "@mui/material";

import Image from "next/image";
import mockup1 from "../public/mockup1.png";
import mockup2 from "../public/mockup2.png";
import mockup3 from "../public/mockup3.png";

import Header from "../src/Header";
import ChooseQuantity from "../src/ChooseQuantity";
import MultiButton from "../src/MultiButton";

//  Displays Mint Status: "Coming Soon | Mint Started | Sold Out"
const MintStatus = styled((props) => {
  //TODO: display data based on candymachine state
  return <Typography {...props}>Mint Started</Typography>;
})``;

//  Displays Amount Left to Mint out of Total Supply
const Quantity = styled((props) => {
  // TODO: get data from candymachine
  return <Typography {...props}>Minted: xxx/xxx</Typography>;
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
      <Mockup src={mockup1} />
      <Mockup src={mockup2} />
      <Mockup src={mockup3} />
    </Box>
  );
})``;

//Displays Total Price based on Quantity Selected
const TotalPrice = styled((props) => {
  //TODO: Display price based on mint supply selected, provided by react context?
  return (
    <Box {...props}>
      <Typography />
    </Box>
  );
})``;

const index = styled((props) => {
  return (
    <Container {...props}>
      <Header />
      <Typography variant="h1">
        The Boss Bulls <span>TM</span> Club
      </Typography>
      <Typography variant="subtitle1">
        An Ultra-Realistic 3D Generative NFT on Solana
      </Typography>
      <MintStatus variant="h2" />
      <Box>
        <Box>
          <Typography>Price per NFT</Typography>
          <Typography>2 SOL Each</Typography>
        </Box>
        <Quantity />
        <Mockups />
        <ChooseQuantity />
      </Box>
      <Box>
        <TotalPrice />
      </Box>
      <MultiButton />
    </Container>
  );
})``;

export default index;
