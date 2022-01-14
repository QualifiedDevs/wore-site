import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Head from "next/head";

import Team from "@components/Team";
import Game from "@components/Game";

//@ts-ignore
const hapesdrop = styled(({manifest, ...props}) => {
  return (
    <>
      <Head>
        <title>HAPES DROP</title>
      </Head>
      <Box {...props}>
        <Box component="aside" className="sidebar">
          {/* @ts-ignore */}
          <Team manifest={manifest} sx={{px: 3}} />
        </Box>
        <Game />
        <Box></Box>
      </Box>
    </>
  );
})`
  height: 100%;
  display: grid;
  grid-template-columns: 20vw 1fr 20vw;
  
  align-content: center;
  justify-content: center;
  justify-items: center;
`;

export default hapesdrop;