import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

import Team from "@components/Team";

import { GPGIcon } from "@components/Branding";

//@ts-ignore

const Footer = styled(({ manifest, ...props }) => {
  return (
    <Box component="footer" {...props}>
      <Container maxWidth={false}>
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
    justify-content: flex-end;
  }

  .logo {
    width: 80px;
  }
`;

export default Footer;
