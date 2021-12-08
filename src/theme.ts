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
      contentBox: 680,
    }
  },
  palette: {
    background: {
      default: "#000000",
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
    fontFamily: "Saira Condensed",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 700,
    },
    subtitle2: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 700,
    },
    body2: {
      fontWeight: 700,
    }
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

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    contentBox: true;
  }
}