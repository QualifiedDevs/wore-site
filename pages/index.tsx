import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Container } from "@mui/material";

import { LogoFull } from "@components/Branding";
import Invite from "@components/Invite";
import { WORELogo } from "@components/Branding";

import Link from "@components/Link"

//@ts-ignore
const index = styled(({ manifest, ...props }) => {
  return (
    <Box {...props}>
      <Box sx={{mb: 10}}>
        {/* @ts-ignore */}
        <WORELogo className="logo" />
        <Typography variant="h2">Real Estate Meets Crypto</Typography>
      </Box>

      <Box>
        <Typography className="desc" variant="h5" sx={{mb: 1}}>
          Coming Soon...
        </Typography>
        <Link href="/presale">
        <Button variant="outlined">Register Now</Button>
        </Link>
      </Box>
    </Box>
  );
})`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  text-align: center;

  .logo {
    width: 650px;
  }

  h2 {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 2.5em;
  }

  h5 {
    color: #8e8e8e;
    text-transform: uppercase;
    font-size: 1.2em;
  }

  .MuiButton-root {
    font-size: 1.5rem;
    letter-spacing: 0.1em;
    background: black;
    color: white;
    border: 2px solid white !important;
    border-radius: 0;
  }
`;

export default index;
