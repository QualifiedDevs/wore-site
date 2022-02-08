//@ts-nocheck

import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

import Team from "@components/Team";
import { GPGIcon } from "@components/Branding";

import manifest from "@src/manifest.json";
const socials = manifest.socials;

import SocialsMenu from "@components/SocialsMenu";

//@ts-ignore

const Footer = styled(({ manifest, ...props }) => {
  return (
    <Box component="footer" {...props} sx={{mt: 4}}>
      <Container maxWidth={false}>
        {/* @ts-ignore */}
        <SocialsMenu socials={socials} />
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
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    width: 80px;
  }
`;

export default Footer;
