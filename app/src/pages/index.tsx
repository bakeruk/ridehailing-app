import {
  useCallback, useEffect, useState
} from "react";
import styled from "styled-components";
import {
  Card, Box, Typography, SelectChangeEvent, MenuItem, Select, Slider, Link
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
const NUMBER_OF_TAXIS_PER_ETA = 5;
const MAX_ETA = 7;

/**
 * Hail a ride page
 */
const HailARidePage: NextPage = () => {
  const { geolocation: userGeolocation } = useGeolocation();
  // eslint-disable-next-line no-unused-vars
  const [ nearestOffice, setNearestOffice ] = useState<SplytOfficeAttributes>();
  const [ selectedOffice, setSelectedOffice ] = useState<SplytOfficeAttributes>();
  const [ nearbyTaxis, setNearbyTaxis ] = useState<DriversNearbyEtas>();
  const [ desiredEta, setDesiredEta ] = useState(7);
  const [ mapViewportConfig, setMapViewportConfig ] = useState<MapProps>();

  const nearbyTaxisApiQuery = useQuery<DriversNearbyEtas, Error>([ "nearbyTaxis", selectedOffice?.name ], async () => await NearbyTaxisClient.getNearbyTaxis({
    ...selectedOffice.coords,
    numberOfVehicles: NUMBER_OF_TAXIS_PER_ETA,
    maxEta: MAX_ETA
  }), {
    enabled: !!selectedOffice,
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000 // 1 minute
  });

  /**
   * Handle office selection
   */
  const handleOfficeSelection = useCallback((event: SelectChangeEvent<string>) => {
    const officeName = event.target.value;
    const selectedOffice = SPLYT_OFFICES.find(office => office.name === officeName);

    // If an office was matched within SPLYT_OFFICES, update state
    if (selectedOffice) {
      // Update the selectedOffice state
      setSelectedOffice(selectedOffice);
    }
  }, []);

  /**
   * Handle ETA slide selection
   */
  const handleEtaSlideSelection = useCallback((_: Event, value: number | number[]) => {
    const eta = !Array.isArray(value) ? value : value[ 0 ];

    // Update the desiredEta state
    // @ts-ignore - Funcitonality correct
    setDesiredEta(eta);
  }, []);

  /**
   * Handle office reset click
   */
  const handleOfficeReset = useCallback(() => {
    // Update the selectedOffice state
    setSelectedOffice(nearestOffice);
  }, [ nearestOffice ]);

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
    }
  }, [ userGeolocation ]);

  // On selectedOffice change
  useEffect(() => {
    if (selectedOffice) {
      // Update the mapViewport config state
      setMapViewportConfig({
        ...selectedOffice.coords,
        zoom: 14
      });
    }
  }, [ selectedOffice ]);

  // On nearbyTaxisApiQuery response change
  useEffect(() => {
    // On failure
    if (nearbyTaxisApiQuery.error) {
      toast.error(nearbyTaxisApiQuery.error.message);
    }

    // On success
    if (nearbyTaxisApiQuery.data) {
      console.log("nearbyTaxisApiQuery.data", nearbyTaxisApiQuery.data);
      console.log("nearbyTaxisApiQuery.data", nearbyTaxisApiQuery.data[ 0 ].drivers[ 0 ].driver_id);
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
          desiredEta={desiredEta}
          viewportConfig={mapViewportConfig}
        />

        {selectedOffice && (
          <Card className="overlay-ui">
            <Typography
              variant="h4"
              component="h2"
            >
              Controls
            </Typography>

            <Box className="control-wrapper eta">
              <Typography
                className="control-label"
                variant="body1"
                component="h3"
              >
                Taxi ETA
              </Typography>

              <Slider
                marks
                size="small"
                defaultValue={MAX_ETA}
                value={desiredEta}
                step={1}
                min={1}
                max={MAX_ETA}
                valueLabelDisplay="auto"
                onChange={handleEtaSlideSelection}
              />
            </Box>

            <Box className="control-wrapper office">
              <Typography
                className="control-label"
                variant="body1"
                component="h3"
              >
                Cloest Splyt office
              </Typography>

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

              {nearestOffice.name !== selectedOffice.name && (
                <Link
                  variant="body2"
                  onClick={handleOfficeReset}
                >
                  Reset
                </Link>
              )}
            </Box>
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

      .control-wrapper {
        padding-top: 1.2rem;

        .control-label {
          padding-bottom: 0.4rem;
        }

        &.office a {
          display: block;
          padding-top: 0.4rem;
          text-align: right;
          cursor: pointer;
        }
      }
    }
  }
`;
