//@ts-nocheck

import { styled } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";

import Team from "@components/Team";
import { GPGIcon } from "@components/Branding";

import manifest from "@src/manifest.json";
const socials = manifest.socials;

import SocialsMenu from "@components/SocialsMenu";

//@ts-ignore

const Footer = styled(({ manifest, ...props }) => {
  return (
    <Box component="footer" {...props} sx={{ mt: 4, pb: 1 }}>
      <Container maxWidth={false}>
        <SocialsMenu socials={socials} />
        <Typography variant="h6">© WOLF OF REAL ESTATE</Typography>
        <a href="https://www.greaterpropertygroup.com/">
          <GPGIcon className="logo" />
        </a>
      </Container>
    </Box>
  );
})`
  background: black;
  border-top: 2px solid #1a1a1a;

  min-height: 80px;
  width: 100%;

  .MuiContainer-root {
    height: 100%;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }

  h6 {
    font-size: 0.9em;
    color: #313131;
  }

  .logo {
    width: 40px;
  }
`;

export default Footer;
