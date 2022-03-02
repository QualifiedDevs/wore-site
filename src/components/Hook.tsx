import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Ticket from "@components/Ticket";

const Hook = styled((props) => {
  return (
    <Box {...props}>
      <Ticket />
    </Box>
  );
})``;

export default Hook;