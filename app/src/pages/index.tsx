import {
  useCallback, useEffect, useState
} from "react";
import styled, { css } from "styled-components";
import { Typography, SelectChangeEvent } from "@mui/material";
import { NextPage } from "next";
import { DriversNearbyEtas } from "@api/packages/splyt-taxis";

import { toast } from "react-toastify";
import { FullWidthLayout } from "src/components/common/layout";
import { HomeTaxisMap, HomeTaxisMapControls } from "src/components/home/taxis-map";
import { useGeolocation } from "src/hooks";
import { findNearestSplytOffice } from "src/utils/helpers";
import {
  SPLYT_OFFICES, SplytOfficeAttributes, NUMBER_OF_TAXIS_PER_ETA, MAX_ETA
} from "src/constants";
import { MapProps } from "src/components/common/map";
import { TaxisNearbyApi } from "src/api/TaxisNearbyApi";
import { useQuery } from "react-query";
import { LoadingBox } from "src/components/common/loading-ui";
import { Modal } from "src/components/common/modal";

const NearbyTaxisClient = new TaxisNearbyApi();

/**
 * Hail a ride page
 */
const HailARidePage: NextPage = () => {
  const { geolocation: userGeolocation } = useGeolocation();
  const [ showModal, setShowModal ] = useState(false);
  const [ showModalTimeout, setShowModalTimeout ] = useState(false);
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
    setDesiredEta(eta);
  }, []);

  /**
   * Handle office reset click
   */
  const handleOfficeReset = useCallback(() => {
    // Update the selectedOffice state
    setSelectedOffice(nearestOffice);
  }, [ nearestOffice ]);

  // On mount
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // If the model is no set to show, set a 2 second timer. If there is no
    // geolocation data, show the welcome modal
    if (!showModal) {
      timeout = setTimeout(() => setShowModalTimeout(true), 2000);
    }

    // Clear the timeout on unmount
    return () => {
      clearTimeout(timeout);
    };
  // On mount only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On showModalTimeout change
  useEffect(() => {
    // If the modal timeout is true and we still do not have a geolocation from
    // the device, show the welcome modal
    if (showModalTimeout && !userGeolocation) {
      setShowModal(true);
    }
  // Only update on showModalTimeout change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ showModalTimeout ]);

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

      <div className="taxi-map">
        <HomeTaxisMap
          selectedOffice={selectedOffice}
          nearbyTaxis={nearbyTaxis}
          desiredEta={desiredEta}
          viewportConfig={mapViewportConfig}
        />

        {showModal && (
          <Modal
            className="welcome-modal"
            title="Hail a Ride"
            onClose={() => setShowModal(false)}
          >
            <Typography
              variant="subtitle1"
              component="p"
            >
              Welcome to Hail a Ride. The one and only place to view local taxis around our opinionated areas. Choose your ETA requirements and location to find your nearest Taxi.
            </Typography>

            <Typography
              variant="body1"
              sx={{ paddingTop: "1.4rem" }}
            >
              Before we begin, we kindly ask that you share your devices location so that we can place you to an area closest to you.
            </Typography>
          </Modal>
        )}

        {nearbyTaxisApiQuery.isFetching && (
          <LoadingBox className="loading-ui" />
        )}

        {selectedOffice && (
          <HomeTaxisMapControls
            className="controls-ui"
            isLoading={nearbyTaxisApiQuery.isFetching}
            selectedEta={desiredEta}
            nearestOffice={nearestOffice}
            selectedOffice={selectedOffice}
            onEtaSelection={handleEtaSlideSelection}
            onOfficeSelect={handleOfficeSelection}
            onOfficeReset={handleOfficeReset}
          />
        )}

      </div>
    </StyledFullWidthLayout>
  );
};

export default HailARidePage;

const StyledFullWidthLayout = styled(FullWidthLayout)`
  ${({ theme }) => css`
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

      .loading-ui {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .controls-ui {
        position: fixed;
        z-index: 2;
        bottom: 0rem;
        right: 0rem;
        width: 100%;
        border-radius: 0.8rem;
        pointer-events: auto;

        @media (min-width: ${theme.breakpoints.MOBILE_SL}) {
          max-width: 34rem;
        }
      }
    }
  `};
`;
