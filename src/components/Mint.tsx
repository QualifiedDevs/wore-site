import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Stack } from "@mui/material";

const Mint = styled((props: { id: string }) => {
  return (
    <Container {...props}>
      <Typography variant="h3">Mint Coming Soon...</Typography>
    </Container>
  );
})`
  text-align: center;
`;

export default Mint;
