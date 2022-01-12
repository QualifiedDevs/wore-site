import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const Game = styled((props) => {
  return (
    <Box {...props}>
      <Typography>GAME</Typography>
    </Box>
  );
})`
  width: 900px;
  height: 600px;
  display: grid;
  place-items: center;

  border: 2px solid white;
`;

export default Game;
