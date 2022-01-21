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
    <Box component="header" {...props}>
      <Container maxWidth="xl" className="content">
        <Box className="menu">
          <Link underline="none" color="white" href="/">
            {/* @ts-ignore */}
            <LogoFull className="logo" />
          </Link>
            {/* @ts-ignore */}
          <Menu items={menu} className="main-menu" />
        </Box>
            {/* @ts-ignore */}
        <SocialsMenu socials={socials} className="socials" />
            {/* @ts-ignore */}
        <MobileMenu items={menu} socials={socials} className="mobile-menu" />
      </Container>
    </Box>
  );
})`
  height: 5rem;
  width: 100%;
  border-bottom: 3px solid #1B2060;


  .content {
    height: 100%;
    width: 100%;
    display: grid;
    align-content: center;
    grid-template-columns: 1fr 1fr;

    .logo {
      font-size: 1.8rem;
    }

    .menu {
        display: flex;
        align-items: center;
    }

    .socials {
        justify-self: end;
    }

    .menu, .socials {
        &, nav, li {
            height: 100%;
        }
    }

    .mobile-menu {
      display: none;
    }
  }

  ${({theme}) => theme.breakpoints.down("md")} {
    .content {
      .main-menu, .socials {
        display: none;
      }
      .mobile-menu {
        display: initial;
      }
    }
    .MuiIconButton-root {
      display: grid;
      place-items: center;
      width: 3.4rem;
      height: 3.4rem;
      margin-left: auto;
    }
  }
`;

export default Header;
