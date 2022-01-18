import {
  Layer,
  Source,
  SourceProps
} from "react-map-gl";
import { theme } from "src/utils/theme";

interface MapClusterLayerProps extends SourceProps {
  id: string;
}

/**
 * Map cluster layer component
 */
export const MapClusterLayer: React.FC<MapClusterLayerProps> = ({
  id,
  clusterMaxZoom,
  maxzoom,
  ...rest
}) => {
  return (
    <Source
      cluster
      id={id}
      clusterMaxZoom={clusterMaxZoom}
      maxzoom={clusterMaxZoom || maxzoom}
      {...rest}
    >
      <Layer
        id="cluster"
        type="circle"
        source={id}
        filter={[ "has", "point_count" ]}
        paint={{
          "circle-color": theme.colors.black,
          "circle-radius": 20,
          "circle-opacity": 1
        }}
      />

      <Layer
        id="cluster-count"
        type="symbol"
        source={id}
        filter={[ "has", "point_count" ]}
        layout={{
          "text-allow-overlap": true,
          "text-field": "{point_count_abbreviated}",
          "text-font": [ "DIN Offc Pro Medium", "Arial Unicode MS Bold" ],
          "text-size": 14
        }}
        paint={{ "text-color": theme.colors.white }}
      />

      <Layer
        id="unclustered-point"
        type="circle"
        source={id}
        filter={[ "!", [ "has", "point_count" ] ]}
        paint={{
          "circle-color": theme.colors.white,
          "circle-radius": 18,
          "circle-opacity": 0.8
        }}
      />

      <Layer
        id="unclustered-icons"
        type="symbol"
        source={id}
        filter={[ "!", [ "has", "point_count" ] ]}
        layout={{
          "icon-allow-overlap": true,
          "icon-size": 0.12,
          "icon-offset": [ 4, -10 ],
          "icon-image": "taxi-icon"
        }}
        // Removes Typescript required issue (LayerProps.paint: mapboxgl.AnyPaint)
        paint={{}}
      />
    </Source>
  );
};