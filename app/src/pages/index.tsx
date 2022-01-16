import styled from "styled-components";

import type { NextPage } from "next";
import { FullWidthLayout } from "src/components/layout";
import { Typography } from "src/components/text";

/**
 * Hail a ride page
 */
const HailARidePage: NextPage = () => {
  return (
    <StyledFullWidthLayout
      metadata={{
        title: "Hail a ride",
        description: "Hail a ride with ease using our interactive map"
      }}
    >
      <Typography as="h1">
        Welcome
      </Typography>
    </StyledFullWidthLayout>
  );
};

export default HailARidePage;

const StyledFullWidthLayout = styled(FullWidthLayout)`
  display: flex;
`;
