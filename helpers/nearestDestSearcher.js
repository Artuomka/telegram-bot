class NearestDestSearcher {
    constructor() {
        this.getFastestWay = (distanceResObject) => {

            const rowsArray = distanceResObject.rows;
            const rowsItemsArray = rowsArray[0].elements;
            const destAdressesArray = distanceResObject.destination_addresses;

            let distanceMin = rowsItemsArray[0].distance.value;
            let distanceMinTxt = rowsItemsArray[0].distance.text;
            let durationInTraffic = rowsItemsArray[0].duration_in_traffic;
            let adress = destAdressesArray[0];

            for (let i = 0; i < rowsItemsArray.length; i++) {
                const currentDistance = rowsItemsArray[i].distance.value;
                const currentDistanseTxt = rowsItemsArray[i].distance.text;
                const currentDurationInTraffic = rowsItemsArray[i].duration_in_traffic;
                const currentAdress = destAdressesArray[i];
                if (distanceMin > currentDistance) {
                    distanceMin = currentDistance;
                    distanceMinTxt = currentDistanseTxt;
                    durationInTraffic = currentDurationInTraffic;
                    adress = currentAdress;
                }
            }
            const response = {
                destinition_adress: adress,
                distance: distanceMin,
                distanceTxt: distanceMinTxt,
                duration_in_traffic: durationInTraffic,
            };
            return (response);
        }
    }
}

module.exports = NearestDestSearcher;
