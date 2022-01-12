import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Header from "@components/Header";
import Footer from "@components/Footer";

const DefaultPage = styled(({ children, manifest, ...props }) => {
  const { mainMenu, socials } = manifest;

  return (
    <Box {...props}>
      <Header menu={mainMenu} socials={socials} />
      <Box className="content">{children}</Box>
      <Footer manifest={manifest} />
    </Box>
  );
})`
  display: grid;
  grid-template-rows: auto 1fr auto;

  height: auto;

  height: 100vh;

  header {
  }

  .content {
    width: 100%;
  }
`;

export default DefaultPage;
