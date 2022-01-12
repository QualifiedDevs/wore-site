import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

import Menu from "@components/Menu";
import SocialsMenu from "@components/SocialsMenu";

import { LogoFull } from "@components/Branding";

import Link from "@components/Link";

const Header = styled(({ menu, socials, ...props }) => {
  return (
    <Box component="header" {...props}>
      <Container maxWidth="xl" className="content">
        <Link underline="none" color="white" href="/">
          <LogoFull className="logo" />
        </Link>
        <Menu items={menu} />
        <SocialsMenu socials={socials} />
      </Container>
    </Box>
  );
})`
  height: 5rem;
  width: 100%;
  border-bottom: 2px solid white;

  .content {
    height: 100%;
    display: grid;
    align-content: center;
    grid-template-columns: 1fr 1fr 1fr;

    .logo {
      font-size: 1.8rem;
    }
  }
`;

export default Header;
