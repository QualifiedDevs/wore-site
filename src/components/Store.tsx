import { styled } from "@mui/material/styles";
import { Box, Container, Button, Typography, ButtonBase } from "@mui/material";

import Image from "next/image";
import storeImg from "@public/wore-store.png";

const Store = styled((props: { id: string }) => {
  return (
    <Container {...props}>
      <Typography variant="h3">WORE Store</Typography>
      <Box className="image-wrapper">
        <Image src={storeImg} layout="responsive" />
      </Box>
    </Container>
  );
})`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .image-wrapper {
    width: 400px;
    border-radius: 25px;
    * {
      border-radius: inherit;
    }
  }
`;

export default Store;
