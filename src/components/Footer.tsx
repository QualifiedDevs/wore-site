import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

import Team from "@components/Team";

//@ts-ignore

const Footer = styled(({manifest, ...props}) => {
  return (
    <Box component="footer" {...props}>
      <Container>
          
      </Container>
    </Box>
  );
})`
  height: 4rem;
  width: 100%;
`;

export default Footer;