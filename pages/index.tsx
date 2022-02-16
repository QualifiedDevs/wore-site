import { styled } from "@mui/material/styles";
import { Box, Container, Button, Typography } from "@mui/material";

import DataForm from "@components/DataForm";

import { WORELogoIcon } from "@src/components/Branding";
import Link from "@components/Link";

const presale = styled((props) => {
  return (
    <Box {...props}>
        {/* @ts-ignore */}
        <WORELogoIcon sx={{ mb: 4 }} />
      <Typography className="notice" sx={{ mb: 4 }}>
        {/* By submitting your contact information, you are registering for an
        opportunity to get a whitelist spot in April when the project officially
        launches. There will be <b>10</b> registrations that get{" "}
        <b>randomly selected</b> to <b>Pre Purchase Prior to March 1st.</b> */}
        By submitting your contact information, you are registering for an opportunity to get a whitelist spot.
      </Typography>
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
    width: min(150px, 20%);
    * {
      width: 100%;
    }
  }

  .notice {
    text-align: center;
    width: min(500px, 80%);

    color: #808080;
    b {
      color: #949494;
    }
  }
`;

export default presale;
