import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#B9FFFF",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ff0000",
    },
  },
});

export default theme;
