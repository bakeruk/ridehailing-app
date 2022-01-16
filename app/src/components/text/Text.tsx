import styled, { css } from "styled-components";

import { getFontAsCss, getTextTransformCss } from "./utils";

export interface TypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: As;
  styledAs?: As;
  bold?: boolean;
  uppercase?: boolean;
  textTransform?: "uppercase" | "lowercase" | "sentence" | "capitalise";
}

type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "a" | "small" | "label" | "dd" | "dt" | "li";

/**
 * Typography component
 */
export const Typography = styled.span<TypographyProps>`
  ${({
    theme, uppercase, onClick
  }) => css`
    font-family: ${theme.fontFamily.LATO};
    font-style: normal;
    text-transform: ${uppercase ? "uppercase" : "none"};
    letter-spacing: ${uppercase ? "0.2rem" : "inherit"};
    cursor: ${onClick ? "pointer" : "inherit"};
    ${getFontAsCss};
    ${getTextTransformCss};

    i {
      font-style: italic;
    }

    u {
      text-decoration: underline;
    }

    sub {
      font-size: 0.6em;
      vertical-align: sub;
    }

    sup {
      font-size: 0.6em;
      vertical-align: super;
    }
  `};
`;
