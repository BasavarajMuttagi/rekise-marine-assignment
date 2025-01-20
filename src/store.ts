import { Coordinate } from "ol/coordinate";
import { LineString } from "ol/geom";
import { getLength } from "ol/sphere";
import { create } from "zustand";

export type LineStringType = {
  wp: string;
  coordinates: {
    x: number;
    y: number;
  };
  distance: null | number;
};
type store = {
  lineStringArray: LineStringType[];
  setLineStringArray: (data: Coordinate[]) => void;
};
const useMapStore = create<store>()((set) => ({
  lineStringArray: [],
  setLineStringArray: (data) =>
    set(() => ({
      lineStringArray: formatLineStringData(data),
    })),
}));
export default useMapStore;

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
