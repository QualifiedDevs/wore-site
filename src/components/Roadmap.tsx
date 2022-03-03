import { styled } from "@mui/material/styles";
import { Container, Box, Typography } from "@mui/material";

import Image from "next/image";
import roadmap from "@public/roadmap.png";

const Roadmap = styled((props: { id: string }) => {
  return (
    <Container {...props}>
      <Box className="image-wrapper">
        <Image src={roadmap} layout="responsive" />
      </Box>
    </Container>
  );
})`
height: 100%;
display: grid;
place-items: center;
.image-wrapper {
    width: 100%;
}
`;

export default Roadmap;
