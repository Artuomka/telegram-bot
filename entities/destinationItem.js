class DestinationItem {
    constructor(name, lat, lng) {
        this.name = name;
        this.coordinates = {
            lat: lat,
            lng: lng
        }
    }

}
module.exports = DestinationItem;
