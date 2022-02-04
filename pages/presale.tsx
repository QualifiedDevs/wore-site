import { styled } from "@mui/material/styles";
import { Box, Container, Button, Typography } from "@mui/material";

import DataForm from "@components/DataForm";

const presale = styled((props) => {
  return (
    <Box {...props}>
      <DataForm />
    </Box>
  );
})`

display: flex;
justify-content: center;
align-items: center;
height: 100%;

`;

export default presale;
