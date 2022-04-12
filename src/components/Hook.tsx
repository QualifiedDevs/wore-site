import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Stack, Typography, IconButton, useMediaQuery } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { WoreLogoFull } from "@components/Branding";

const Background = styled((props) => {
  return (
    <Box {...props}>
      <video src="/teaser-trailer.mp4" autoPlay loop muted />
      <div className="overlay" />
    </Box>
  );
})`
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: grid;
  place-items: center;
  video {
    min-width: 100%;
    min-height: 100%;
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(3, 3, 3);
    background: linear-gradient(
      0deg,
      rgba(3, 3, 3, 1) 0%,
      rgba(3, 3, 3, 0.5) 30%
    );
  }
`;

const Hook = styled((props: { id: string }) => {

  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    console.log("recoom!!!");
  }, [isSmallDevice]);

  return (
    <Box {...props}>
      <Background />
      <Stack className="ui" spacing={5}>
        {/* @ts-ignore */}
        <WoreLogoFull className="logo" />
        <Stack
          direction={isSmallDevice? "column" : "row"}
          spacing={2}
          alignItems={isSmallDevice? "center" : "flex-end"}
          className="buttons"
          sx={{ pl: 2 }}
        >
          <Button
            component="a"
            href="#private-sale"
            className="preorder"
            variant="outlined"
          >
            Preorder
          </Button>
          <Button
            component="a"
            href="#sign-up"
            className="community"
            variant="outlined"
          >
            Join Our Community
          </Button>
        </Stack>
      </Stack>
      <IconButton component="a" href="#about" className="jump">
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  );
})`
  position: relative;
  min-height: 100%;
  overflow: hidden;

  .ui {
    position: absolute;
    bottom: min(8%, 60px);
    left: min(4%, 40px);
    .buttons {
      width: fit-c
    }
  }

  .logo {
    width: min(80vw, 600px);
  }

  .MuiButton-root {
    color: white;
    padding: 1em 2em;
    border-radius: 1000px;
    width: fit-content;
    height: fit-content;
  }

  .preorder {
    font-size: 1.5em;
  }

  .community {
    font-size: .9em;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .jump {
    position: absolute;
    width: fit-content;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;
    color: #ffffff;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    display: grid;
    place-items: center;
    .ui {
      position: static;
    }
  }

  ${({theme}) => theme.breakpoints.down("sm")} {
    .buttons {
      font-size: .8em;
    }
  }
`;

export default Hook;
