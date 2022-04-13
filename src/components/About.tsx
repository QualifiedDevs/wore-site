import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

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
    <Box {...props}>
      {/* <Background /> */}
      {/* <Typography variant="h3" sx={{ mb: 4 }}>
        About
      </Typography> */}
      <Stack className="content-wrapper">
        <Typography sx={{ mb: 4 }}>
          The Wolf Of Real Estate NFT is the world's first NFT project backed by
          an established and successful real world real estate brokerage. Our
          community has exclusive access to education and business with web3 and
          IRL (In Real Life) opportunities.
        </Typography>
        <Typography variant="h4">
          W.O.R.E. Litepaper{" "}
          <IconButton
            className="download-button"
            component="a"
            href="/WORE-litepaper.pdf"
            download="WORE-litepaper.pdf"
          >
            <DownloadIcon />
          </IconButton>
        </Typography>
        <Box
          component="a"
          href="/WORE-litepaper.pdf"
          className="thumbnail-wrapper"
          sx={{ mb: 1, mt: 2 }}
        >
          <Image src={litepaper} />
        </Box>
      </Stack>
    </Box>
  );
})`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100%;

  p {
    max-width: 800px;
  }

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
    padding: 2em;
    border-radius: 8px;
  }

  .thumbnail-wrapper {
    transition: transform 0.2s ease;
    :hover {
      transform: scale(1.05, 1.05);
    }
    width: min(550px, 90%);
    border-radius: 8px;
    * {
      border-radius: inherit;
    }
  }

  .download-button {
    svg {
      color: #058cfcfd;
    }
  }
`;

export default About;
