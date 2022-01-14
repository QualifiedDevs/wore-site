import React from "react";

import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import Unity, { UnityContext, IUnityConfig } from "react-unity-webgl";

//  How do I direct this to the public folder instead?

const unityContext = new UnityContext({
  loaderUrl: "https://www.qualifieddevs.io/HAPEDROP/Build/HAPEDROP.loader.js",
  dataUrl: "https://www.qualifieddevs.io/HAPEDROP/Build/HAPEDROP.data",
  frameworkUrl: "https://www.qualifieddevs.io/HAPEDROP/Build/HAPEDROP.framework.js",
  codeUrl: "https://www.qualifieddevs.io/HAPEDROP/Build/HAPEDROP.wasm",
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
