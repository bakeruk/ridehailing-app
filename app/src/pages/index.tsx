import styled from "styled-components";

import type { NextPage } from "next";
import { FullWidthLayout } from "src/components/common/layout";
import { Typography } from "src/components/common/text";
import { HomeTaxisMap } from "src/components/home/taxis-map";

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
      <Typography
        as="h1"
        className="off-screen"
      >
        Nearby Taxis
      </Typography>

      <div className="taxi-map">
        <HomeTaxisMap />
      </div>
    </StyledFullWidthLayout>
  );
};

export default HailARidePage;

const StyledFullWidthLayout = styled(FullWidthLayout)`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .taxi-map {
    width: 100%;
    height: 100%;
  }
`;
