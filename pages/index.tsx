import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const index = styled((props) => {
  return (
    <Box {...props}>
      <Typography variant="h1">Coming Soon</Typography>
    </Box>
  );
})`

display: grid;
place-items: center;
color: white;
height: 100vh;
`;

export default index;
