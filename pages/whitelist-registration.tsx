import { styled } from "@mui/material/styles";
import { Box, Container, Button, Typography } from "@mui/material";

import DataForm from "@components/DataForm";

import { WORELogoIcon } from "@src/components/Branding";
import Link from "@components/Link";

const presale = styled((props) => {
  return (
    <Box {...props}>
      <Link href="/">
        {/* @ts-ignore */}
        <WORELogoIcon className="logo" sx={{ mb: 4 }} />
      </Link>
      <DataForm />
    </Box>
  );
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .logo {
    width: 125px;
  }
`;

export default presale;
