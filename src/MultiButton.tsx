import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import { useWallet } from "@solana/wallet-adapter-react";
import useCandyMachine from "../hooks/useCandyMachine";

import WalletModalButton from "./WalletModalButton";
import MintButton from "./MintButton";

const MultiButton = styled((props) => {
  const { connected } = useWallet();
  const { isSoldOut, mintStartDate, isMinting } = useCandyMachine();

  return (
    <Box {...props}>
      {!connected ? (
        <WalletModalButton>Connect<br/>Wallet</WalletModalButton>
      ) : !isSoldOut ? (
        <MintButton>Mint</MintButton>
      ) : (
        <Typography variant="h4">Sold Out</Typography>
      )}
    </Box>
  );
})``;

export default MultiButton;