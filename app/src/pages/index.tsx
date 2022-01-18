import {
  useCallback, useEffect, useState
} from "react";
import styled from "styled-components";
import {
  Card, Box, Typography, SelectChangeEvent, MenuItem, Select
} from "@mui/material";
import { NextPage } from "next";
import { DriversNearbyEtas } from "@api/packages/splyt-taxis";

import { toast } from "react-toastify";
import { FullWidthLayout } from "src/components/common/layout";
import { HomeTaxisMap } from "src/components/home/taxis-map";
import { useGeolocation } from "src/hooks";
import { findNearestSplytOffice } from "src/utils/helpers";
import { SPLYT_OFFICES, SplytOfficeAttributes } from "src/constants";
import { MapProps } from "src/components/common/map";
import { TaxisNearbyApi } from "src/api/TaxisNearbyApi";
import { useQuery } from "react-query";

const NearbyTaxisClient = new TaxisNearbyApi();

/**
 * Hail a ride page
 */
const HailARidePage: NextPage = () => {
  const { geolocation: userGeolocation } = useGeolocation();
  // eslint-disable-next-line no-unused-vars
  const [ nearestOffice, setNearestOffice ] = useState<SplytOfficeAttributes>();
  const [ selectedOffice, setSelectedOffice ] = useState<SplytOfficeAttributes>();
  const [ nearbyTaxis, setNearbyTaxis ] = useState<DriversNearbyEtas>();
  const [ mapViewportConfig, setMapViewportConfig ] = useState<MapProps>();

  const nearbyTaxisApiQuery = useQuery<DriversNearbyEtas, Error>([ "nearbyTaxis", selectedOffice.name ], async () => await NearbyTaxisClient.getNearbyTaxis(selectedOffice.coords), {
    enabled: !!selectedOffice,
    refetchInterval: 60 * 1000 // 1 minute
  });

  const handleOfficeSelection = useCallback((event: SelectChangeEvent<string>) => {
    const officeName = event.target.value;
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

  useEffect(() => {
    // On failure
    if (nearbyTaxisApiQuery.error) {
      toast.error(nearbyTaxisApiQuery.error.message);
    }

    // On success
    if (nearbyTaxisApiQuery.data) {
      console.log("data", nearbyTaxisApiQuery.data);
      setNearbyTaxis(nearbyTaxisApiQuery.data);
    }
  }, [ nearbyTaxisApiQuery.error, nearbyTaxisApiQuery.data ]);

  return (
    <StyledFullWidthLayout
      metadata={{
        title: "Hail a ride",
        description: "Hail a ride with ease using our interactive map"
      }}
    >
      <Typography
        variant="h1"
        className="off-screen"
      >
        Nearby Taxis
      </Typography>

      <Box className="taxi-map">
        <HomeTaxisMap
          selectedOffice={selectedOffice}
          nearbyTaxis={nearbyTaxis}
          viewportConfig={mapViewportConfig}
        />

        {selectedOffice && (
          <Card className="overlay-ui">
            <Select
              fullWidth
              value={selectedOffice.name}
              disabled={nearbyTaxisApiQuery.isLoading}
              onChange={handleOfficeSelection}
            >
              {SPLYT_OFFICES.map(office => (
                <MenuItem
                  key={office.name}
                  value={office.name}
                >
                  {office.label}
                </MenuItem>
              ))}
            </Select>
          </Card>
        )}
      </Box>
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
      padding: 1.4rem;
      border-radius: 0.8rem;
    }
  }
`;
