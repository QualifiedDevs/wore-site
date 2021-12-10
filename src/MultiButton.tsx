import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

import { useWallet } from "@solana/wallet-adapter-react";
import useCandyMachine from "../hooks/useCandyMachine";

import WalletModalButton from "./WalletModalButton";
import MintButton from "./MintButton";

// TODO: Everything :)

/*
    ? STATES:
    *   Mint Coming Soon
    *   Countdown to Mint
    *   Connect Wallet
    *   Mint
    *   Mint Loading
    *   Sold Out
    * 
    *   Make a Countdown, 
*/

const MultiButton = styled((props) => {
  const { connected } = useWallet();
  const { isSoldOut, mintStartDate, isMinting } = useCandyMachine();

  return (
    <>
      {!connected ? (
        <WalletModalButton {...props}>Connect Wallet</WalletModalButton>
      ) : !isSoldOut ? (
        <MintButton {...props}>Mint</MintButton>
      ) : (
        <Button {...props} disabled>
          Sold Out
        </Button>
      )}
    </>
  );
})`
:disabled {
    background: #747474b5;
}
`;

export default MultiButton;
