import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Image from "next/image";

const Ticket = styled((props) => {
  return <Box component="video" src="/card.mp4" autoPlay loop {...props} />;
})`
  width: 200px;
  height: 200px;
  border: 4px solid #ac00ac;
  border-radius: 8px;
  box-shadow: 0px 0px 30px #a800a880;
`;

export default Ticket;