//@ts-nocheck

import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";

import ConnectButton from "@components/ConnectButton";
import PurchaseUI from "@components/PurchaseUI";
import useWeb3 from "@hooks/useWeb3";

const ValueWindow = styled((props) => {
  const {
    connected,
    connectedAccount,
    maxPerWallet,
    maxSupply,
    totalSupply,
    soldOut,
    mintedBalance,
    isMinting,
    price,
  } = useWeb3();

  return (
    <Paper {...props}>
      <Typography>{`connected: ${connected}`}</Typography>
      <Typography>{`connectedAccount: ${connectedAccount}`}</Typography>
      <Typography>{`maxPerWallet: ${maxPerWallet}`}</Typography>
      <Typography>{`maxSupply: ${maxSupply}`}</Typography>
      <Typography>{`totalSupply: ${totalSupply}`}</Typography>
      <Typography>{`soldOut: ${soldOut}`}</Typography>
      <Typography>{`mintedBalance: ${mintedBalance}`}</Typography>
      <Typography>{`isMinting: ${isMinting}`}</Typography>
      <Typography>{`price: ${price}`}</Typography>
    </Paper>
  );
})``;

const jointWhitelist = styled((props) => {
  const { connected } = useWeb3();

  return (
    <Box {...props}>
      {connected ? <PurchaseUI /> : <ConnectButton variant="contained" />}
      {/* <ValueWindow /> */}
    </Box>
  );
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default jointWhitelist;
