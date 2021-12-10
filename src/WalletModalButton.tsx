import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { useWallet } from "@solana/wallet-adapter-react";
import useCandyMachine from "../hooks/useCandyMachine";

const WalletModalButton = styled((props) => {

  const { setVisible } = useWalletModal();
  const { connected } = useWallet();
  const { isSoldOut, mintStartDate, isMinting, startMint } = useCandyMachine();

  return (
    <Button
      variant="contained"
      onClick={() => setVisible(true)}
      disabled={connected}
      {...props}
    >
      {props.children}
    </Button>
  );
})``;

export default WalletModalButton;