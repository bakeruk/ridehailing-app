import {
  css, DefaultTheme, ThemedStyledProps
} from "styled-components";

import type { TypographyProps } from "../Text";

/**
 * Gets the CSS for the requested font
 */
export const getFontAsCss = ({
  theme, as, styledAs, bold
}: ThemedStyledProps<TypographyProps, DefaultTheme>) => {
  const styleAs = styledAs ? styledAs : as;

  // Style the text according to the styleAs
  switch (styleAs) {
    case "h1":
      return css`
       font-size: 2.8rem;
       font-weight: 900;
       line-height: 1.2em;

       @media (min-width: ${theme.breakpoints.MOBILE_SL}) {
         font-size: 3.2rem;
       }
     `;

    case "h2":
      return css`
       font-size: 2.1rem;
       font-weight: 900;
       line-height: 1.2em;

       @media (min-width: ${theme.breakpoints.MOBILE_SL}) {
         font-size: 2.4rem;
       }
     `;

    case "h3":
      return css`
       font-size: 1.8rem;
       font-weight: 900;
       line-height: 1.2em;
     `;

    case "h4":
      return css`
       font-size: 1.6rem;
       font-weight: 900;
       line-height: 1.4em;
     `;

    case "h5":
      return css`
       font-size: 1.5rem;
       font-weight: 900;
       line-height: 1.4em;
     `;

    case "label":
      return css`
       font-size: 1.3rem;
       font-weight: ${!bold ? 400 : 700};
       line-height: 1.4em;
     `;

    case "small":
      return css`
       font-size: 1.2rem;
       font-weight: ${!bold ? 400 : 700};
       line-height: 1.4em;

       strong {
        font-weight: ${!bold ? 700 : 900};
       }
     `;

    case "a":
      return css`
       font-size: 1.6rem;
       font-weight: ${!bold ? 400 : 700};
       line-height: 1.4em;
       text-decoration: underline;
       cursor: pointer;

       strong {
         font-weight: ${!bold ? 700 : 900};
       }
     `;

    case "p":
    case "span":
    case "li":
    default:
      return css`
       font-size: 1.6rem;
       line-height: 1.4em;
       font-weight: ${!bold ? 400 : 700};

       strong {
         font-weight: ${!bold ? 700 : 900};
       }
     `;
  }
};