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
      <Link href={props.link}>
        <Typography {...props}>{props.item}</Typography>
      </Link>
    </li>
  );
})``;

const SocialMenu = styled((props) => {
  return <Box {...props}>{props.children}</Box>;
})``;

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
})``;

export default Header;
