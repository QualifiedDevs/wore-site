import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Header from "@components/Header";
import Footer from "@components/Footer";

import manifest from "@src/manifest.json"
const {mainMenu, socials} = manifest;

//@ts-ignore
const DefaultPage = styled(({ children, ...props }) => {

  return (
    <Box {...props}>
      {/* @ts-ignore */}
      <Header menu={mainMenu} socials={socials} />
      <Box className="content">{children}</Box>
      {/* @ts-ignore */}
      <Footer />
    </Box>
  );
})`
  display: grid;
  grid-template-rows: auto 1fr auto;

  height: 100vh;

  .content {
    width: 100%;
  }
`;

export default DefaultPage;
