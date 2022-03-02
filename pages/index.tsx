import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Presale from "@components/Presale";
import TeamDesc from "@components/TeamDesc";

const index = styled((props) => {
  return (
    <Box {...props}>
      <Presale />
      <TeamDesc />
    </Box>
  );
})``;

export default index;
