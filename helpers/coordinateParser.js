function parseCoordinates(destinationsArray) {
  return destinationsArray.map(({ coordinates: { lat, lng } }) => ({ lat, lng }));
}

module.exports = { parseCoordinates };
