import { IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
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
    background: {
      default: "#0A0C26",
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
    fontFamily: "Roboto, sans-serif",
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    button: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "mint" },
          style: {},
        },
      ],
    },
  },
});

declare module "@mui/material/styles" {
  interface PaletteOptions {
    button?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    mint: true;
  }
}

export default theme;

declare module "@mui/material/styles" {
  interface BreakpointOverrides {

  }
}
