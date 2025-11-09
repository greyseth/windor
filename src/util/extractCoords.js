function extractCoords(pbString) {
  // Match patterns like !1d-6.30733... and !2d106.7552...
  const latMatch = pbString.match(/!1d(-?\d+\.\d+)/);
  const lngMatch = pbString.match(/!2d(-?\d+\.\d+)/);

  if (latMatch && lngMatch) {
    return {
      lat: parseFloat(latMatch[1]),
      lng: parseFloat(lngMatch[1]),
    };
  } else {
    throw new Error("Could not find latitude/longitude in provided string");
  }
}

export default extractCoords;
