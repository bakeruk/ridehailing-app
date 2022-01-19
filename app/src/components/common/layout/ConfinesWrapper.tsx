// import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface ConfinesWrapperProps {
  type?: ConfinesType;
  center?: boolean;
}

type ConfinesType = "full-width";

/**
 * Confines wrapper component
 */
// export const ConfinesWrapper: React.FC<ConfinesWrapperProps> = (

// );

export const ConfinesWrapper = styled.div<ConfinesWrapperProps>`
  ${({
    theme, type, center
  }) => css`
    margin: ${center ? "0 auto" : "auto"};
    padding: 1.4rem;
    ${setWidthByType(type)}

    @media (min-width: ${theme.breakpoints.MOBILE_SL}) {
      padding: 2.8rem;
    }
  `};
`;

/**
 * Set the width by the given type
 */
const setWidthByType = (type?: ConfinesType) => {
  switch (type) {
    case "full-width":
      return css`
        width: 100%;
      `;
  }
};