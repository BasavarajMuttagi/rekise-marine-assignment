import Map from "ol/Map";
import View from "ol/View";
import { Coordinate } from "ol/coordinate";
import { LineString } from "ol/geom";
import Draw from "ol/interaction/Draw";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { getLength } from "ol/sphere";
import { Fill, Stroke, Style } from "ol/style";
import { useEffect, useRef, useState } from "react";
import MissionModal from "./MissionModal";
export type LineStringType = {
  wp: string;
  coordinates: {
    x: number;
    y: number;
  };
  distance: null | number;
};
const OpenLayersMap = () => {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const drawRef = useRef<Draw | null>(null);
  const vectorSource = useRef(new VectorSource());
  const [drawType] = useState<"LineString" | "Polygon">("LineString");
  const [isDrawing, setIsDrawing] = useState(false);
  const [mission, setMission] = useState<Coordinate[]>([]);
  const [formattedData, setFormattedData] = useState<LineStringType[]>([]);
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    if (!mapElementRef.current) return;

    const map = new Map({
      target: mapElementRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource.current,
          style: new Style({
            stroke: new Stroke({
              color: "#ff0000",
              width: 2,
            }),
            fill: new Fill({
              color: "rgba(255, 0, 0, 0.1)",
            }),
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    mapRef.current = map;

    return () => {
      map.dispose();
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && drawRef.current && isDrawing) {
        drawRef.current.finishDrawing();
        setIsDrawing(false);

        // Remove the draw interaction after completion
        if (mapRef.current && drawRef.current) {
          mapRef.current.removeInteraction(drawRef.current);
          drawRef.current = null;
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [isDrawing]);

  useEffect(() => {
    if (!mapRef.current) return; // Don't add draw interaction if drawing is complete

    // Remove existing draw interaction if any
    mapRef.current
      .getInteractions()
      .getArray()
      .filter((interaction) => interaction instanceof Draw)
      .forEach((interaction) => mapRef.current?.removeInteraction(interaction));

    // Add new draw interaction only if drawing is not complete
    const draw = new Draw({
      source: vectorSource.current,
      type: drawType,
    });

    draw.on("drawstart", () => {
      setIsDrawing(true);
    });

    draw.on("drawend", (event) => {
      setIsDrawing(false);
      if (drawType === "LineString") {
        const geometry = event.feature.getGeometry() as LineString;
        const coordinates = geometry.getCoordinates();
        setMission(coordinates);
        setShow(true);
      }
    });

    drawRef.current = draw;
    mapRef.current.addInteraction(draw);

    return () => {
      if (mapRef.current) {
        mapRef.current.removeInteraction(draw);
      }
    };
  }, [drawType]);

  useEffect(() => {
    const data = formatLineStringData(mission);
    setFormattedData(data);
  }, [mission]);
  return (
    <>
      <div
        ref={mapElementRef}
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      />
      <MissionModal data={formattedData} isShow={isShow} setShow={setShow} />
    </>
  );
};

export default OpenLayersMap;

const formatLineStringData = (coordinates: Coordinate[]): LineStringType[] => {
  const points: LineStringType[] = [];

  coordinates.forEach((coord, index) => {
    const point: LineStringType = {
      wp: `WP${index + 1}`,
      coordinates: {
        x: coord[0],
        y: coord[1],
      },
      distance: null,
    };

    if (index > 0) {
      const line = new LineString([coordinates[index - 1], coord]);
      const distance = getLength(line);
      point.distance = Math.round(distance * 100) / 100;
    }

    points.push(point);
  });

  return points;
};
