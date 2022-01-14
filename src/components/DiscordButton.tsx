import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

import Discord from "@src/vector-graphics/socials/discord";

//@ts-ignore
const DiscordButton = styled(({ link, ...props }) => {
  return (
    <Button
      {...props}
      component="a"
      href={link}
      variant="contained"
      endIcon={<Discord />}
    >
      Join the Discord
    </Button>
  );
})`
  border: 2px solid white;
  border-radius: 100px;
  padding: 0.8rem 1.5rem;
  font-size: 1.25rem;
  text-transform: lowercase;
  font-family: Tw Cen MT;
`;

export default DiscordButton;
