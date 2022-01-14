import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

import Menu from "@components/Menu";
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
          <Menu items={menu} />
        </Box>
            {/* @ts-ignore */}
        <SocialsMenu socials={socials} className="socials" />
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


  }
`;

export default Header;
