import React from "react";

import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import Unity, { UnityContext, IUnityConfig } from "react-unity-webgl";

//  How do I direct this to the public folder instead?

const unityContext = new UnityContext({
  loaderUrl: "http://localhost:3000/HAPEDROP/Build/HAPEDROP.loader.js",
  dataUrl: "http://localhost:3000/HAPEDROP/Build/HAPEDROP.data",
  frameworkUrl: "http://localhost:3000/HAPEDROP/Build/HAPEDROP.framework.js",
  codeUrl: "http://localhost:3000/HAPEDROP/Build/HAPEDROP.wasm",
});

const Game = styled((props) => {
  return (
    <Box {...props}>
      <Unity unityContext={unityContext} />
    </Box>
  );
})`
  width: 900px;
  height: 600px;
  display: grid;
  place-items: center;

  border: 2px solid white;
  border-radius: 10px;

  canvas {
    width: 100%;
    height: 100%;
  }
`;

export default Game;
