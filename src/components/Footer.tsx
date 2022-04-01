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
        <SocialsMenu socials={socials} className="socials"/>
        <Typography variant="h6">© WOLF OF REAL ESTATE</Typography>
        <Box className="logo-wrapper">
          <a href="https://www.greaterpropertygroup.com/">
            <GPGIcon className="logo" />
          </a>
        </Box>
      </Container>
    </Box>
  );
})`
  background: black;
  border-top: 2px solid #1a1a1a;
  text-align: center;

  min-height: 80px;
  width: 100%;

  .MuiContainer-root {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: end;
    justify-content: center;
  }

  .socials {
    justify-self: start;
  }

  h6 {
    font-size: 0.9em;
    color: #313131;
  }

  .logo-wrapper {
    display: flex;
    height: 100%;
    align-items: end;
    justify-content: end;
    a {
      display: block;
      width: fit-content;

    }
  }

  .logo {
    width: 40px;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    svg {
      width: 1.3rem;
      height: 1.3rem;
    }
    .logo {
      width: 1.7rem;
    }
  }
`;

export default Footer;
