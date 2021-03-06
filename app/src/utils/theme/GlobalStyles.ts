import {
  createGlobalStyle,
  css
} from "styled-components";

import reset from "styled-reset";

/**
 * Global styles
 */
export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    ${reset};

    * {
      box-sizing: border-box;
    }

    html {
      position: relative;
      font-size: 62.5%;
    }

    body {
      font-family: ${theme.fontFamily.ROBOTO};
      color: ${theme.colors.black};
      background-color: ${theme.colors.white};
      overflow: auto;
      -webkit-overflow-scrolling: touch;

      i {
        display: inline-block;
      }

      .off-screen {
        position: absolute;
        left: -99999rem;
        text-indent: -99999rem;
      }

      #__next {
        display: block;
        width: 100%;
        min-height: 100vh;
      }
    }
  `};
`;
