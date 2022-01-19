import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

import { transparentize } from "polished";

import { LoadingSpinner, LoadingSpinnerProps } from "./LoadingSpinner";

interface LoadingBoxProps extends HTMLAttributes<HTMLDivElement> {
  spinnerProps?: LoadingSpinnerProps;
}

/**
 * Loading box component
 */
export const LoadingBox: React.FC<LoadingBoxProps> = ({ spinnerProps, ...rest }) => (
  <StyledLoadingBox {...rest}>
    <LoadingSpinner {...spinnerProps} />
  </StyledLoadingBox>
);

const StyledLoadingBox = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${transparentize(0.4, theme.colors.grey[ 200 ])}
  `};
`;