import {
  useEffect, useRef, useState
} from "react";

import { InteractiveMapProps, MapRef } from "react-map-gl";
import {
  defaultViewport,
  Map,
  MapProps
} from "src/components/common/map";

interface HomeTaxisMapProps extends MapProps {
  viewportConfig?: InteractiveMapProps;
}

/**
 * Home taxis map component
 */
export const HomeTaxisMap: React.FC<HomeTaxisMapProps> = ({ viewportConfig, ...rest }) => {
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
      {...rest}
    />
  );
};