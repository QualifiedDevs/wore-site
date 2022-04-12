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
        <About id="about" sx={{ mt: 8, mb: 10 }} />
        <Roadmap id="roadmap" sx={{mt: 14, mb: 20}} />
        <TeamDesc id="team" sx={{ my: 10 }} />
        <FAQ id="faq" sx={{my: 10}} />
        <PrivateSale id="private-sale" sx={{my: 4}} />
        <Mint id="mint" />
        {/* <Events id="events" /> */}
        {/* <Store id="store" /> */}
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
