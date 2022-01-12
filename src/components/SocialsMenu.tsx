import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

//  import dynamic from "next/dynamic";

// Make this part dynamic later! probably from wherever I parse for socials the first time.
import discord from "@src/vector-graphics/socials/discord";
import twitter from "@src/vector-graphics/socials/twitter";

const socialIcons = {
  discord,
  twitter,
};

//TODO: Type annotations on props
const SocialButton = styled(({ social, link, ...props }) => {
  //@ts-ignore
  const Icon = socialIcons[social];

  return (
    <IconButton component="a" href={link} color="primary" {...props}>
      <Icon />
    </IconButton>
  );
})``;

const SocialsMenu = styled(({ socials, ...props }) => {
  const socialButtons = Object.keys(socials).map((socialName: string) => {
    const link = socials[socialName];
    return <SocialButton social={socialName} link={link} />;
  });
  return <Box component="nav" {...props}>{socialButtons}</Box>;
})``;

export default SocialsMenu;