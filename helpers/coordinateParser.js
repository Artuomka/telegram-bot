class CoordinateParser {
    constructor() {
        this.parseCoordinates = (destinationsArray) => {
            const coordinatesArray = [];
            for (let i = 0; i < destinationsArray.length; i++) {
                coordinatesArray.push({
                    lat: destinationsArray[i].coordinates.lat,
                    lng: destinationsArray[i].coordinates.lng,
                });
            }
            return coordinatesArray;
        }
    }
}

module.exports = CoordinateParser;
