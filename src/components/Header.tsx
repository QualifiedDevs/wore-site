//@ts-nocheck

import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

import Link from "@components/Link";

import MobileMenu from "@components/MobileMenu";
import NavMenu from "@components/NavMenu";
import ConnectWallet from "./ConnectWallet";

import { LogoFull, WORELogoIcon } from "@components/Branding";

import manifest from "@src/manifest.json";
const mainMenu = manifest.mainMenu;

const NavLogo = styled((props) => {
  return (
    <Link href={"/#hook"} {...props}>
      <WORELogoIcon className="logo" />
    </Link>
  );
})`
  width: 25px;
`;

const Header = styled(({ ...props }) => {
  return (
    <Box component="header" {...props} sx={{ px: 2, mb: 4 }}>
      <Container maxWidth={false} className="content">
        <NavLogo />
        <NavMenu
          menuData={mainMenu}
          className="nav-menu"
          sx={{ ml: "auto", mr: 6 }}
        />
        <ConnectWallet variant="contained" />
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
  }

  .mobile-menu {
    display: none;
  }

  .MuiButton-root {
    white-space: nowrap;
    width: fit-content;
    padding: 0.6em 2em;
  }

  .MuiIconButton-root {
    width: 3.4rem;
    height: 3.4rem;
    margin-left: auto;
    svg {
      width: 80%;
      height: 80%;
    }
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    .MuiButton-root {
      margin: auto;
    }

    .MuiContainer-root {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }

    .nav-menu {
      display: none;
    }
    .mobile-menu {
      display: initial;
    }
  }
`;

export default Header;
