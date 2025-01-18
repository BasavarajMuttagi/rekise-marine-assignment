import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import OSM from "ol/source/OSM";
import { useEffect, useRef } from "react";

const OpenLayersMap = () => {
  const mapElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElementRef.current) return;

    const map = new Map({
      target: mapElementRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => {
      map.dispose();
    };
  }, []);

  return (
    <div
      ref={mapElementRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    />
  );
};

export default OpenLayersMap;
