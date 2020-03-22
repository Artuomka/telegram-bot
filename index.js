const TelegramBot = require('node-telegram-bot-api');
const Client = require("@googlemaps/google-maps-services-js").Client;
const DaoMock = require('./dal/daoMock');
const DaoMongoDB = require('./dal/daoMongoDB');
const CoordinateParser = require('./helpers/coordinateParser');
const NearestDestSearcher = require('./helpers/nearestDestSearcher');
const ResponseStringifier = require('./helpers/responseStringifier');
const DestinitionItem = require('./entities/destinationItem');
//todo organize imports
const token = '991172205:AAHucwiAR9dMZELfMCfLGHtNpD-axsHez9E';
const GOOGLE_MAPS_API_KEY = 'AIzaSyCDUKbKLGBuURunLCvtU3m6COrPtMVl6E8';
const travellingMode = 'driving';

const client = new Client({});
const bot = new TelegramBot(token, {polling: true});

// const destinationDataObject = new DaoMock(); -> Mock data access object for developing
const destinationDataObject = new DaoMongoDB();
const coordinateParser = new CoordinateParser();
const nearestDestSearcher = new NearestDestSearcher();
const responseStringifier = new ResponseStringifier();

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const {location: {latitude, longitude}} = msg;
    const origin = {lat: latitude, lng: longitude};

    requestToGoogleMaps(origin, (res) => {
        const foundDestinition = nearestDestSearcher.getFastestWay(res);
        bot.sendMessage(chatId, responseStringifier.responseStringify(foundDestinition));
    });

});

async function requestToGoogleMaps(origin, callback) {
    console.log('func called');
    const currentDate = new Date();
    const orLat = origin.lat;
    const orLong = origin.lng;
    const destinationArray = await (destinationDataObject.readDestinationItems());
    const destinationCoordinates = coordinateParser.parseCoordinates(destinationArray);

    client
        .distancematrix({
            params: {
                origins: [{lat: orLat, lng: orLong}],
                destinations: destinationCoordinates,
                mode: travellingMode,
                departure_time: currentDate,
                key: GOOGLE_MAPS_API_KEY
            },
            timeout: 1000
        })
        .then(r => {
            callback(r.data);
        })
        .catch(e => {
            console.log(e);
        });
}
