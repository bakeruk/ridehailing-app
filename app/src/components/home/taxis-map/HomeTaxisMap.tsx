import * as MapboxGL from "mapbox-gl";
import {
  useEffect, useRef, useState
} from "react";
import { DriversNearbyEtas } from "@api/packages/splyt-taxis";
import { DriverAttributes } from "@api/libs/splyt-api";

import {
  InteractiveMapProps, MapRef, Marker
} from "react-map-gl";
import {
  defaultViewport,
  Map,
  MapProps,
  BuildingMapMarker,
  MapClusterLayer
} from "src/components/common/map";
import { SplytOfficeAttributes } from "src/constants";

interface HomeTaxisMapProps {
  selectedOffice?: SplytOfficeAttributes;
  nearbyTaxis?: DriversNearbyEtas;
  viewportConfig?: MapProps;
}

interface TaxisFeatureAttributes extends DriverAttributes {
  eta: number
}

/**
 * Home taxis map component
 */
export const HomeTaxisMap: React.FC<HomeTaxisMapProps> = ({
  selectedOffice, nearbyTaxis, viewportConfig
}) => {
  const mapRef = useRef<MapRef>(null);
  const [ viewport, setViewport ] = useState<InteractiveMapProps>(defaultViewport);
  const [ clusterPoints, setClusterPoints ] = useState<GeoJSON.FeatureCollection<GeoJSON.Point, TaxisFeatureAttributes>>();

  // On Mount
  useEffect(() => {
    const map = mapRef.current?.getMap() as MapboxGL.Map;

    // If the Map does not have the "taxi-icon", load it in
    if (!map.hasImage("taxi-icon")) {
      map.loadImage("https://static.thenounproject.com/png/142898-200.png", (err, img) => {
      // If an error occurs
        if (err) {
          throw err;
        }

        // If the image is undefined, throw an error
        if (!img) {
          throw new Error("Taxi icon image was not be loaded.");
        }

        // Add the image to the map
        map.addImage("taxi-icon", img);
      });
    }
  }, []);

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

  // On nearbyTaxis change
  useEffect(() => {
    if (nearbyTaxis) {
      const taxiFeatureData: TaxisFeatureAttributes[] = [];

      // Get the each taxis into the object structure (TaxisFeatureAttributes) that we want
      for (const nearbyTaxisGrouped of nearbyTaxis) {
        const eta = nearbyTaxisGrouped.pickup_eta;

        for (const drivers of nearbyTaxisGrouped.drivers) {
          taxiFeatureData.push({
            ...drivers,
            eta
          });
        }
      }

      const taxisFeatures: Array<GeoJSON.Feature<GeoJSON.Point, TaxisFeatureAttributes>> = taxiFeatureData.map(taxi => ({
        type: "Feature",
        id: taxi.driver_id,
        properties: taxi,
        geometry: {
          type: "Point",
          coordinates: [ taxi.location.longitude, taxi.location.latitude ]
        }
      }));

      // Update ClusterPoints state
      setClusterPoints({
        type: "FeatureCollection",
        features: taxisFeatures
      });
    }
  }, [ nearbyTaxis ]);

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

      {clusterPoints && (
        <MapClusterLayer
          id="nearby-taxis"
          type="geojson"
          clusterRadius={26}
          clusterMaxZoom={24}
          data={clusterPoints}
        />
      )}
    </Map>
  );
};