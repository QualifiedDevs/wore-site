import { styled } from "@mui/material/styles";
import { Box, Typography, Paper, Button, Stack } from "@mui/material";

import manifest from "@src/manifest.json";

const Events = styled((props: { id: string }) => {
  return (
    <Box {...props}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Weekly Live Calls
      </Typography>
      <Stack className="event-items" spacing={2}>
        <Button
          className="event"
          variant="contained"
          component="a"
          href={manifest.socials.twitter}
        >
          <Typography variant="h5">
            <b>Twitter Spaces</b> - Thursdays 3:30pm Eastern
          </Typography>
        </Button>
        <Button
          className="event"
          variant="contained"
          component="a"
          href="https://www.clubhouse.com/club/wolf-of-real-estate?utm_medium=ch_club&utm_campaign=E2Id_G0Uu_wC9bd2wDTQ0g-126944"
        >
          <Typography variant="h5">
            <b>Clubhouse</b> - Wednesdays 2:00pm Eastern
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
})`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 60vh;

  a {
    text-decoration: none;
    color: white;
  }

  .event {
    text-align: left;
    justify-content: start;
    background: #3a3a3a;
    :hover {
      background: #292929;
    }
    padding: 1.5rem;
    b {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export default Events;
