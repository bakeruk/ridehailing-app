import { createTheme } from "@mui/material/styles";

import {
  BreakPoint, colors, FontFamily, Radii, TransitionSpeed
} from "./constants";

export * from "./GlobalStyles";
export type Theme = typeof theme;
export type MuiTheme = typeof muiTheme;

export const theme = {
  colors,
  breakpoints: BreakPoint,
  fontFamily: FontFamily,
  radii: Radii,
  transitions: { speeds: TransitionSpeed }
};

export const muiTheme = createTheme({
  palette: {
    primary: { main: colors.grey[ 100 ] },
    secondary: { main: colors.grey[ 100 ] },
    grey: colors.grey,
    success: { main: colors.green[ 100 ] },
    info: { main: colors.blue[ 160 ] },
    warning: { main: colors.yellow[ 100 ] },
    error: { main: colors.red[ 100 ] },
    background: { default: colors.grey[ 0 ] }
  },
  typography: {
    fontFamily: FontFamily.ROBOTO,
    fontSize: 18
  }
});
