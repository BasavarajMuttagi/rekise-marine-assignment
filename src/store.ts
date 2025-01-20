import { Coordinate } from "ol/coordinate";
import { LineString } from "ol/geom";
import { getLength } from "ol/sphere";
import { create } from "zustand";

export type LineStringType = {
  wp: string;
  type: "LineString" | "Polygon";
  coordinates:
    | {
        x: number;
        y: number;
      }
    | LineStringType[];
  distance: null | number;
};

type selectedPolygon = {
  LineString: LineStringType;
  position: "before" | "after";
};

type drawType = "LineString" | "Polygon";

type store = {
  lineStringArray: LineStringType[];
  setLineStringArray: (data: Coordinate[]) => void;
  polygonStringArray: LineStringType[];
  setPolygonStringArray: (data: Coordinate[]) => void;
  selectedPolygon: selectedPolygon | null;
  setSelectedPolygon: (data: selectedPolygon | null) => void;
  showMissionModal: boolean;
  setShowMissionModal: (data: boolean) => void;
  showPolygonModal: boolean;
  setShowPolygonModal: (data: boolean) => void;
  drawType: "LineString" | "Polygon";
  setDrawType: (data: drawType) => void;
};
const useMapStore = create<store>()((set) => ({
  lineStringArray: [],
  setLineStringArray: (data) =>
    set(() => ({
      lineStringArray: formatLineStringData(data),
    })),

  polygonStringArray: [],
  setPolygonStringArray: (data) =>
    set(() => ({
      polygonStringArray: formatLineStringData(data),
    })),

  selectedPolygon: null,
  setSelectedPolygon: (data) =>
    set(() => ({
      selectedPolygon: data,
    })),

  showMissionModal: true,
  showPolygonModal: false,
  setShowPolygonModal: (data) =>
    set(() => ({
      showPolygonModal: data,
    })),
  setShowMissionModal: (data) =>
    set(() => ({
      showMissionModal: data,
    })),
  drawType: "LineString",
  setDrawType: (data) =>
    set(() => ({
      drawType: data,
    })),
}));
export default useMapStore;

const formatLineStringData = (coordinates: Coordinate[]): LineStringType[] => {
  const points: LineStringType[] = [];

  coordinates.forEach((coord, index) => {
    const point: LineStringType = {
      wp: `WP${index + 1}`,
      type: "LineString",
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
