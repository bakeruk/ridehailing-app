import { HTMLAttributes } from "react";
import styled from "styled-components";

type SelectProps = HTMLAttributes<HTMLSelectElement>;

/**
 * Select component
 */
export const Select: React.FC<SelectProps> = ({ children, ...rest }) => (
  <StyledSelect {...rest}>
    {children}
  </StyledSelect>
);

const StyledSelect = styled.select`
  font-size: 1.4rem;
`;