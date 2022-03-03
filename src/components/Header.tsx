//@ts-nocheck

import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

import Link from "@components/Link";

import MobileMenu from "@components/MobileMenu";

import { LogoFull, WORELogoIcon } from "@components/Branding";

import NavMenu from "@components/NavMenu";

import manifest from "@src/manifest.json";
const mainMenu = manifest.mainMenu;

const NavLogo = styled((props) => {
  return (
    <Link href={"/#sign-up"} {...props}>
      <WORELogoIcon className="logo" />
    </Link>
  );
})`
  width: 30px;
`;

const Header = styled(({ ...props }) => {
  return (
    <Box component="header" {...props} sx={{ px: 2, mb: 4 }}>
      <Container maxWidth={false} className="content">
        <NavLogo />
        <NavMenu menuData={mainMenu} className="nav-menu" />
        <MobileMenu
          menuData={{ "sign up": "/#sign-up", ...mainMenu }}
          className="mobile-menu"
        />
      </Container>
    </Box>
  );
})`
  min-height: 80px;
  border-bottom: 2px solid #1a1a1a;

  .MuiContainer-root {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .mobile-menu {
    display: none;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    .nav-menu {
      display: none;
    }
    .mobile-menu {
      display: initial;
    }
  }
`;

export default Header;
