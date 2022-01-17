import styled, { css } from "styled-components";

import { transparentize } from "polished";

/**
 * Card component
 */
export const Card = styled.div`
  ${({ theme }) => css`
    padding: 1.6rem;
    background: ${transparentize(0.4, theme.colors.grey[ 40 ])};
  `};
`;