import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import { LogoFull } from "@components/Branding";

//@ts-ignore
const index = styled(({manifest, ...props}) => {
  return (
    <Box {...props}>
      {/* @ts-ignore */}
      <LogoFull className="logo" sx={{mb: 1}} />
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