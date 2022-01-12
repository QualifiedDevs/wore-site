import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import { LogoFull } from "@components/Branding";

const index = styled((props) => {
  return (
    <Box {...props}>
      <LogoFull className="logo" sx={{mb: 2}} />
      <Typography>The best devs on this side of the blockchain.</Typography>
    </Box>
  );
})`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  .logo {
    font-size: 4rem;
  }
`;

export default index;
