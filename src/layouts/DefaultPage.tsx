import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Header from "@components/Header";
import Footer from "@components/Footer";

//@ts-ignore
const DefaultPage = styled(({ children, manifest, ...props }) => {

  const {mainMenu, socials} = manifest;

  return (
    <Box {...props}>
        {/* @ts-ignore */}
      {/* <Header menu={mainMenu} socials={socials} /> */}
      <Box className="content">{children}</Box>
        {/* @ts-ignore */}
      {/* <Footer manifest={manifest} /> */}
    </Box>
  );
})`
  display: grid;
  grid-template-rows: 1fr;
  height: 100vh;

  .content {
    width: 100%;
  }
`;

export default DefaultPage;