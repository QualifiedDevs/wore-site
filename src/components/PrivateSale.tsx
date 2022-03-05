import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Stack } from "@mui/material";

import Ticket from "@components/Ticket";
import ConnectWallet from "@components/ConnectWallet";

//disclaimer: If you are purchasing on the private sale, it is highly recommended that you use a desktop or laptop, and not a mobile device.
//backwards countdown

const PrivateSale = styled(({ ...props }: { id: string }) => {
  return (
    <Container
      component={Stack}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Private Sale
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={3}>
        <Ticket />
        <Ticket />
        <Ticket />
      </Stack>
      {/* @ts-ignore */}
      <ConnectWallet variant="contained" />
    </Container>
  );
})`
  text-align: center;
`;

export default PrivateSale;
