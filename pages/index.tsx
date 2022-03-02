import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Hook from "@components/Hook";
import Presale from "@components/Presale";
import TeamDesc from "@components/TeamDesc";

const index = styled((props) => {
  return (
    <Box {...props}>
      <Hook />
      <Presale />
      <TeamDesc />
    </Box>
  );
})``;

export default index;
