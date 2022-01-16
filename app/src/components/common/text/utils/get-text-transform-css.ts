import {
  ThemedStyledProps, DefaultTheme, css
} from "styled-components";

import type { TypographyProps } from "../Text";

/**
 * Gets the text transformation CSS for the request text transform
 */
export const getTextTransformCss = ({ textTransform }: ThemedStyledProps<TypographyProps, DefaultTheme>) => {
  switch (textTransform) {
    case "uppercase":
      return css`
        text-transform: uppercase;
      `;

    case "lowercase":
      return css`
        text-transform: lowercase;
      `;

    case "capitalise":
      return css`
        text-transform: capitalize;
      `;

    case "sentence":
      return css`
        text-transform: lowercase;

        &:first-letter {
          text-transform: capitalize;
        }
      `;

    default:
      return css`
        text-transform: none;
      `;
  }
};