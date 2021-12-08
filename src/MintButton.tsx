import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";

import { useWallet } from "@solana/wallet-adapter-react";
import useCandyMachine from "../hooks/useCandyMachine";

const MultiButton = styled((props) => {
  const { connected } = useWallet();
  const { isSoldOut, mintStartDate, isMinting, startMint } = useCandyMachine();

  return (
    <LoadingButton
      variant="contained"
      onClick={startMint}
      disabled={!connected || isMinting || isSoldOut}
      loading={isMinting}
      {...props}
    >
      {!isSoldOut ? props.children : "Sold Out"}
    </LoadingButton>
  );
})``;

export default MultiButton;
