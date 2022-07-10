import dechets from "./donnees/dechets";
import pointApport from "./donnees/pointApport";
import categoriePointApport from "./donnees/categoriePointApport";
import haversine from "haversine-distance";

function getPointApport({ id, longitude, latitude }) {
  const points = getAllPointApport({ id });
  return sortByDistance(longitude, latitude, points);
}

function getAllPointApport({ id }) {
  const ouDeposer = dechets[id]?.ouDeposer;
  // Case when the waste has no point of disposal
  if (!ouDeposer) {
    return [];
  }
  const res = [];
  for (let i = 0; i < ouDeposer.length; i++) {
    const element = categoriePointApport[ouDeposer[i]]?.pointApport;
    if (element) {
      for (let j = 0; j < element.length; j++) {
        const point = element[j];
        res.push(pointApport[point]);
      }
    }
  }
  return res.slice(0, 12);
}

function sortByDistance(longitude, latitude, points) {
  const res = [];
  for (let i = 0; i < points.length; i++) {
    const e = points[i];
    const distance = haversine(
      { longitude, latitude },
      { longitude: e.longitude, latitude: e.latitude }
    );
    res.push({ ...e, distance });
  }
  return res.sort((a, b) => a.distance - b.distance);
}

export default getPointApport;
