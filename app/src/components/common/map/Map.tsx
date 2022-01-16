import "mapbox-gl/dist/mapbox-gl.css";

import { forwardRef } from "react";

import ReactMapGL, {
  FlyToInterpolator,
  InteractiveMapProps,
  MapRef
} from "react-map-gl";

export type MapProps = InteractiveMapProps;

/**
 * Map component
 */
export const Map = forwardRef<MapRef, MapProps>(({
  latitude = defaultViewport.latitude,
  longitude = defaultViewport.longitude,
  zoom = defaultViewport.zoom,
  children,
  ...rest
}, ref) => (
  <ReactMapGL
    ref={ref}
    mapStyle="mapbox://styles/mapbox/streets-v11"
    mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    width="100%"
    height="100%"
    latitude={latitude}
    longitude={longitude}
    zoom={zoom}
    transitionDuration={1000}
    transitionInterpolator={new FlyToInterpolator()}
    {...rest}
  >
    {children}
  </ReactMapGL>
));

export const defaultViewport: Required<Pick<InteractiveMapProps, "latitude" | "longitude" | "zoom">> = {
  latitude: 52.3555177,
  longitude: -1.1743197,
  zoom: 2
};