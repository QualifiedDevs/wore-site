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
    <Box component="footer" {...props} sx={{ mt: 4 }}>
      <Container maxWidth={false}>
        {/* @ts-ignore */}

          <SocialsMenu socials={socials} />
        

        <Typography variant="h6">© WOLF OF REAL ESTATE</Typography>
        <a href="https://www.greaterpropertygroup.com/">
          {/* @ts-ignore */}
          <GPGIcon className="logo" />
        </a>
      </Container>
    </Box>
  );
})`
  height: 100px;
  width: 100%;

  .MuiContainer-root {
    display: flex;
    align-items: end;
    justify-content: space-between;
  }

  h6 {
    font-size: 0.9em;
    color: #313131;
  }

  .logo {
    width: 80px;
  }
`;

export default Footer;
