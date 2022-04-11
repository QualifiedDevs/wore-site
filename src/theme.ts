import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#f5bf55",
      contrastText: "FFF",
    },
    secondary: {
      main: "#FFF",
    },
    background: {
      default: "#030303",
    },
    text: {
      primary: "#ffffff",
      secondary: "#d2c1af",
    },
    button: {
      main: "#e3b37f",
      dark: "#C18749",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "gothambook",
    h1: {},
    h2: {},
    h3: {
      fontWeight: 500,
    },
    h4: {},
    h5: {},
    h6: {},
    button: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
  },
});

export default theme;

declare module "@mui/material/styles" {
  interface PaletteOptions {
    button?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {}
}
