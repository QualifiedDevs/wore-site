import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Header from "@components/Header";
import Footer from "@components/Footer";

import Hook from "@components/Hook";
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
        <Hook id="hook" />
        <PrivateSale id="private-sale" sx={{my: 4}} />
        <About id="about" sx={{ mb: 4 }} />
        <Events id="events" />
        <FAQ id="faq" />
        <Roadmap id="roadmap" />
        <TeamDesc id="team" sx={{ py: 4, my: 4 }} />
        {/* <Store id="store" /> */}
        <Mint id="mint" />
        <SignUp id="sign-up" />
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
