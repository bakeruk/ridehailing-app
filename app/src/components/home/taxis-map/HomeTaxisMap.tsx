import {
  useEffect, useRef, useState
} from "react";
import { DriversNearbyEtas } from "@api/splyt-taxis";

import {
  InteractiveMapProps, MapRef, Marker
} from "react-map-gl";
import {
  defaultViewport,
  Map,
  MapProps,
  BuildingMapMarker
} from "src/components/common/map";
import { SplytOfficeAttributes } from "src/constants";

interface HomeTaxisMapProps {
  selectedOffice?: SplytOfficeAttributes;
  nearbyTaxis?: DriversNearbyEtas;
  viewportConfig?: MapProps;
}

/**
 * Home taxis map component
 */
export const HomeTaxisMap: React.FC<HomeTaxisMapProps> = ({ selectedOffice, viewportConfig }) => {
  const mapRef = useRef<MapRef>(null);
  const [ viewport, setViewport ] = useState<InteractiveMapProps>(defaultViewport);

  // On viewportConfig change
  useEffect(() => {
    // Update the viewport state
    setViewport(current => ({
      ...current,
      ...viewportConfig
    }));
  // Only update on viewportConfig change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ viewportConfig ]);

  return (
    <Map
      ref={mapRef}
      onViewportChange={setViewport}
      {...viewport}
    >
      {selectedOffice && (
        <Marker
          key={selectedOffice.name}
          {...selectedOffice.coords}
        >
          <BuildingMapMarker />
        </Marker>
      )}
    </Map>
  );
};