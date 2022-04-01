import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Paper } from "@mui/material";

import Image from "next/image";
import background from "@public/about-bg.jpg";
import litepaper from "@public/litepaper-thumbnail.png";

const Background = styled((props) => {
  return (
    <Box {...props}>
      <Image src={background} layout="fill" />
    </Box>
  );
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const About = styled((props: { id: string }) => {
  return (
    <Box {...props} sx={{ py: 8 }}>
      <Background />
      <Typography variant="h3">ABOUT</Typography>
      <Container className="content-wrapper">
        <Box className="bg">
          <Box component="a" href="/WORE-litepaper.pdf" className="thumbnail-wrapper" sx={{mb: 1, mt: 2}}>
            <Image src={litepaper} />
          </Box>
          <Typography variant="h4" sx={{mb: 4}}>WORE litepaper</Typography>
          <Typography>
            The Wolf Of Real Estate NFT is the world's first NFT project backed
            by an established and successful real world real estate brokerage.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
})`
display; flex;
position: relative;
flex-direction: column;
align-items: center;
text-align: center;
height: min(100%);

.content-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: colmun;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.bg {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #00000096;
    padding: 2em;
    border-radius: 8px;
}

.thumbnail-wrapper {
  transition: transform .2s ease;
  :hover {
    transform: scale(1.05, 1.05);
  }
  width: min(550px, 90%);
  border-radius: 8px;
  * {
    border-radius: inherit;
  }
}

`;

export default About;
