import {
  useCallback, useEffect, useState
} from "react";
import styled from "styled-components";

import type { NextPage } from "next";
import { FullWidthLayout } from "src/components/common/layout";
import { Typography } from "src/components/common/text";
import { HomeTaxisMap } from "src/components/home/taxis-map";
import { useGeolocation } from "src/hooks";
import { findNearestSplytOffice } from "src/utils/helpers";
import { SPLYT_OFFICES, SplytOfficeAttributes } from "src/constants";
import type { MapProps } from "src/components/common/map";
import { Select } from "src/components/common/form";

import { Card } from "../components/common/card";

/**
 * Hail a ride page
 */
const HailARidePage: NextPage = () => {
  const { geolocation: userGeolocation } = useGeolocation();
  // eslint-disable-next-line no-unused-vars
  const [ nearestOffice, setNearestOffice ] = useState<SplytOfficeAttributes>();
  const [ selectedOffice, setSelectedOffice ] = useState<SplytOfficeAttributes>();
  const [ mapViewportConfig, setMapViewportConfig ] = useState<MapProps>();

  const handleOfficeSelection = useCallback(event => {
    const officeName = event.currentTarget.value;
    const selectedOffice = SPLYT_OFFICES.find(office => office.name === officeName);

    // If an office was matched within SPLYT_OFFICES, update state
    if (selectedOffice) {
      // Update the selectedOffice state
      setSelectedOffice(selectedOffice);

      // Update the mapViewport config state
      setMapViewportConfig({
        ...selectedOffice.coords,
        zoom: 15
      });
    }
  }, []);

  // On usersGeolocation change
  useEffect(() => {
    // If the user's geolocation is available
    if (userGeolocation) {
      // Find the nearest Splyt office
      const nearestSplytOffice = findNearestSplytOffice(userGeolocation.latitude, userGeolocation.longitude);

      // Update the nearestOffice state
      setNearestOffice(nearestSplytOffice);
      // Update the selectedOffice state
      setSelectedOffice(nearestSplytOffice);

      // Update the mapViewport config state with the coordinates of the nearest
      // office
      setMapViewportConfig({
        ...nearestSplytOffice.coords,
        zoom: 15
      });
    }
  }, [ userGeolocation ]);

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
        <HomeTaxisMap
          viewportConfig={mapViewportConfig}
          selectedOffice={selectedOffice}
        />

        {selectedOffice && (
          <Card className="overlay-ui">
            <Select
              defaultValue={selectedOffice.name}
              onChange={handleOfficeSelection}
            >
              {SPLYT_OFFICES.map(office => (
                <option
                  key={office.name}
                  value={office.name}
                >
                  {office.label}
                </option>
              ))}
            </Select>
          </Card>
        )}
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
    position: relative;
    width: 100%;
    height: 100%;

    .overlay-ui {
      position: absolute;
      bottom: 4.2rem;
      right: 4.2rem;
      width: 100%;
      max-width: 30rem;
      border-radius: 0.8rem;
    }
  }
`;
