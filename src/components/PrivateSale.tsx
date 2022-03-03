import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Stack } from "@mui/material";

import Ticket from "@components/Ticket";

const PrivateSale = styled((props: { id: string }) => {
  return (
    <Container
      component={Stack}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Typography variant="h3" sx={{mb: 5}}>Private Sale</Typography>
      <Stack direction="row" justifyContent="center" spacing={3}>
        <Ticket />
        <Ticket />
        <Ticket />
      </Stack>
    </Container>
  );
})`
  text-align: center;
`;

export default PrivateSale;
