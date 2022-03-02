import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const About = styled((props) => {
  return (
    <Box {...props}>
      <Typography variant="h3">About</Typography>
      <Typography>
        The Wolf Of Real Estate NFT is the world's first NFT project backed by
        an established and successful real world real estate brokerage.
      </Typography>
    </Box>
  );
})`
display; flex;
align-items: column;

`;

export default About;
