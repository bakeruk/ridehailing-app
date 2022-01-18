import * as MapboxGL from "mapbox-gl";
import {
  useCallback,
  useEffect, useRef, useState
} from "react";
import { DriversNearbyEtas } from "@api/packages/splyt-taxis";
import { DriverAttributes } from "@api/libs/splyt-api";

import {
  InteractiveMapProps, MapEvent, MapRef, Marker
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
  desiredEta?: number;
  viewportConfig?: MapProps;
}

interface TaxisFeatureAttributes extends DriverAttributes {
  eta: number
}

interface TaxisGeoFeatureAttributes extends Omit<TaxisFeatureAttributes, "location"> {
  location: string;
}

interface ClusterTaxisAtrributes {
  cluster: boolean;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: number;
}

interface GeoJSONFeature<P = ClusterTaxisAtrributes | TaxisGeoFeatureAttributes> extends GeoJSON.Feature<GeoJSON.Point, P> {
  layer: MapboxGL.Layer;
  source: string;
  sourceLayer: string;
  state: { [key: string]: unknown };
}

// type TaxiFeatures = Array<GeoJSONFeature<TaxisFeatureAttributes>>;

enum ClusterClickZoomLevel {
  MAX = 18,
  DEFAULT = 17,
  MIN = 15,
}

/**
 * Home taxis map component
 */
export const HomeTaxisMap: React.FC<HomeTaxisMapProps> = ({
  selectedOffice, nearbyTaxis, desiredEta, viewportConfig
}) => {
  const mapRef = useRef<MapRef>(null);
  const [ viewport, setViewport ] = useState<InteractiveMapProps>(defaultViewport);
  const [ clusterPoints, setClusterPoints ] = useState<GeoJSON.FeatureCollection<GeoJSON.Point, TaxisFeatureAttributes>>();

  /**
   * Handle on map click
   *
   * Zooms in on clusters and selects uncluttered points
   *
   * @param event - A map event object
   */
  const handleOnMapClick = useCallback(async (event: MapEvent) => {
    const feature = event.features?.[ 0 ] as GeoJSONFeature | undefined;
    const [ lng, lat ] = feature?.geometry.coordinates || event.lngLat;
    let zoom = viewport.zoom || ClusterClickZoomLevel.DEFAULT;

    // If the event is a feature
    if (feature) {
      // Event logic based on the layer ID
      switch (feature.layer.id) {
        // Cluster selection
        case "cluster": {
          // Set the new zoom according to the current zoom level
          if (zoom < 14) {
            zoom = ClusterClickZoomLevel.MIN;
          } else if (zoom <= ClusterClickZoomLevel.MIN) {
            zoom = ClusterClickZoomLevel.DEFAULT;
          } else {
            zoom = ClusterClickZoomLevel.MAX;
          }

          // centre viewport to search location
          setViewport({
            latitude: lat,
            longitude: lng,
            zoom
          });
        } break;

        // Taxi selection
        case "unclustered-point": {
          const unclusteredFeature = feature as GeoJSONFeature<TaxisGeoFeatureAttributes>;
          const location = JSON.parse(unclusteredFeature.properties.location) as TaxisFeatureAttributes["location"];

          // centre viewport to search location
          setViewport({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: ClusterClickZoomLevel.MAX
          });
        } break;
      }
    }
  }, [ viewport.zoom ]);

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

        // Only show the taxis within the desired ETA
        if (desiredEta && eta <= desiredEta) {
          for (const drivers of nearbyTaxisGrouped.drivers) {
            taxiFeatureData.push({
              ...drivers,
              eta
            });
          }
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
  }, [ nearbyTaxis, desiredEta ]);

  return (
    <Map
      ref={mapRef}
      onViewportChange={setViewport}
      onClick={handleOnMapClick}
      interactiveLayerIds={clusterPoints ? [ "cluster", "unclustered-point" ] : []}
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