import { styled } from "@mui/material/styles";
import { Container, Box, Typography } from "@mui/material";

import Image from "next/image";
import roadmap from "@public/roadmap.jpg";

const Roadmap = styled((props: { id: string }) => {
  return (
    <Container {...props}>
      <Box className="image-wrapper">
        <Image src={roadmap} layout="responsive" />
      </Box>
    </Container>
  );
})`
  min-height: 100%;
  display: grid;
  place-items: center;
  .image-wrapper {
    width: 90%;
    border-radius: 10px;
    * {
      border-radius: inherit;
    }
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    border-radius: 0;
    padding: 0;
    .image-wrapper {
      width: 100%;
    }
  }
`;

export default Roadmap;
