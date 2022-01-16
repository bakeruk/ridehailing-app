import {
  BreakPoint, colors, FontFamily, Radii, TransitionSpeed
} from "./constants";

export * from "./GlobalStyles";
export type Theme = typeof theme;

export const theme = {
  colors,
  breakpoints: BreakPoint,
  fontFamily: FontFamily,
  radii: Radii,
  transitions: { speeds: TransitionSpeed }
};