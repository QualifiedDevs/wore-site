import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Header from "@components/Header";
import Footer from "@components/Footer";

import SignUp from "@components/SignUp";
import About from "@components/About";
import Events from "@components/Events";
import FAQ from "@components/FAQ";
import Roadmap from "@components/Roadmap";
import TeamDesc from "@components/Team";
import PrivateSale from "@components/PrivateSale";
import Store from "@components/Store";
import Mint from "@components/Mint";

const index = styled((props) => {
  return (
    <Box {...props}>
      <Header />
      <Box className="content" sx={{ scrollBehavior: "smooth" }}>
        <SignUp id="sign-up" sx={{mb: 4}}/>
        <About id="about" sx={{ my: 4 }} />
        <Events id="events" />
        <FAQ id="faq" />
        <Roadmap id="roadmap" />
        <TeamDesc id="team" sx={{ py: 4, my: 4 }} />
        {/* <PrivateSale id="private-sale" /> */}
        {/* <Store id="store" /> */}
        <Mint id="mint" />
      </Box>
      <Footer />
    </Box>
  );
})`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;

  .content {
    overflow: auto;
    width: 100%;
  }

  header,
  footer {
    margin: 0;
  }
`;

export default index;
