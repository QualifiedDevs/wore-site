import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

import Menu from "@components/Menu";
import MobileMenu from "@components/MobileMenu";
import SocialsMenu from "@components/SocialsMenu";

import { LogoFull } from "@components/Branding";

import Link from "@components/Link";

//@ts-ignore

const Header = styled(({ menu, socials, ...props }) => {
  return (
    <Box component="header" {...props} sx={{mb: 4}}>
      <Container maxWidth="xl" className="content"></Container>
    </Box>
  );
})`
  height: 0px;
`;

export default Header;
