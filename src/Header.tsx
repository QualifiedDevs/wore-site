import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Link from "./Link";

import Image from "next/image";
import logo from "../public/logo.png";

const Logo = styled((props) => {
  return (
    <Box {...props}>
      <Image src={logo} />
    </Box>
  );
})``;

const MenuItem = styled((props) => {
  return (
    <li>
      <Link underline="none" color="#bcc2b9" href={props.link}>
        <Typography variant="h5" {...props}>{props.item}</Typography>
      </Link>
    </li>
  );
})`
    text-transform: uppercase;
    font-size: 1rem;
`;

const SocialMenu = styled((props) => {
  return <Box {...props}>{props.children}</Box>;
})`
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
`;

const Header = styled((props) => {
  return (
    <Box {...props}>
      <header>
        <Logo />
        <SocialMenu>
          <MenuItem item="Twitter" link="https://twitter.com/BossBullsClub" />
          <MenuItem item="Discord" link="https://discord.gg/bossbullsclub" />
        </SocialMenu>
      </header>
    </Box>
  );
})`

width: 100%;
header {
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

`;

export default Header;
