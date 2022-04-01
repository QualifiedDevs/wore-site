import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Image from "next/image";

const Ticket = styled(
  ({ active, ...props }: { active?: boolean; className?: string }) => {
    return (
      <Box {...props} className={`${props.className || ""} ${active && "active"}`}>
        <video src="/card.mp4" autoPlay loop muted></video>
      </Box>
    );
  }
)`

  border-radius: 8px;

  transition: box-shadow 0.2s;

  border: 3px solid gray;

  video {
    border-radius: inherit;
    filter: grayscale(100%);
    width: 100%;
    transition: filter 0.35s;
  }
  transition: filter 0.35s ease, border 0.35s;

  &.active {
    border: 3px solid #ac00ac;
    box-shadow: 0px 0px 30px #a800a880;
    video {
      filter: grayscale(0);
    }
  }
`;

export default Ticket;
