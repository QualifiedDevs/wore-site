import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Button, Stack } from "@mui/material";

import Link from "@components/Link";

const SignUp = styled((props) => {
  return <Box {...props}></Box>;
})``;

const Mint = styled((props: { id: string }) => {
  return (
    <Container {...props}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        <b>MINT</b> - Coming Soon...
      </Typography>
      <Box>
        <Typography variant="h4">Mint will take place in Q2 F'22</Typography>
        <Box component="ul" className="info">
          <li>
            <Typography>8,888 Total Supply</Typography>
          </li>
          <li>
            <Typography>1,888 Gen 0</Typography>
          </li>
          <li>
            <Typography>7,000 Gen 1</Typography>
          </li>
        </Box>
      </Box>
      <Typography sx={{ mb: 4 }}>
        Join our community <Link href="/#sign-up">below</Link> for
        an opportunity to receive a whitelist spot.
      </Typography>
      <Button component={Link} href="/#sign-up" variant="contained">
        Join Now
      </Button>
    </Container>
  );
})`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h3 {
    b {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  h4 {
  }

  .info {
    text-align: left;
    with: 100%;
  }

  .MuiButton-root {
    padding: 0.8em 2em;
  }
`;

export default Mint;
