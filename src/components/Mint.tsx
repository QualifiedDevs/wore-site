import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Stack } from "@mui/material";

const SignUp = styled((props) => {
  return <Box {...props}></Box>;
})``;

const Mint = styled((props: { id: string }) => {
  return (
    <Container {...props}>
      <Typography variant="h3">MINT - Coming Soon...</Typography>
      <Box>
        <Typography variant="h4">Mint will take place in Q2 F'22</Typography>
        <Typography>8,888 Total Supply</Typography>
        <Typography>1,888 Gen 0</Typography>
        <Typography>7,000 Gen 1</Typography>
      </Box>
      <Typography>
        Submit your contact information above for an opportunity to receive a
        whitelist spot.
      </Typography>
    </Container>
  );
})`
  height: 100%;
  display: flex;
  flex-firection: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default Mint;
