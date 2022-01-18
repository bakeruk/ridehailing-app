import React, { HTMLAttributes } from "react";
import styled from "styled-components";

import { Head, HeadAttributes } from "src/components/common/head";

interface FullWidthLayoutAttributes extends Pick<HTMLAttributes<HTMLDivElement>, "className"> {
  metadata: HeadAttributes;
}

/**
 * Full width layout component
 */
export const FullWidthLayout: React.FC<FullWidthLayoutAttributes> = ({
  metadata, children, ...rest
}) => (
  <StyledFullWidthLayout {...rest}>
    <Head {...metadata} />

    <main>
      {children}
    </main>
  </StyledFullWidthLayout>
);

const StyledFullWidthLayout = styled.div`
  width: 100%;

  main {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;