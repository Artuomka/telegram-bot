const TelegramBot           = require('node-telegram-bot-api');
const googleMapsService     = require("@googlemaps/google-maps-services-js");
const DaoMongoDB            = require('./dal/daoMongoDB');
const CoordinateParser      = require('./helpers/coordinateParser');
const NearestDestSearcher   = require('./helpers/nearestDestSearcher');
const ResponseStringifier   = require('./helpers/responseStringifier');
const config                = require('./config.json');
const token                 = config.development.bot_token;
const GOOGLE_MAPS_API_KEY   = config.development.google_api_key;
const travellingMode        = config.development.traveling_mode;
const { Client }            = googleMapsService;
const client                = new Client({});
const bot                   = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (!msg.location) return bot.sendMessage(chatId, "Для получения информации, пожалуйста отправь мне свою геометку");

  const { location: { latitude: lat, longitude: lng } } = msg;

  const res = await requestToGoogleMaps({ lat, lng });

  const foundDestinition = NearestDestSearcher.getFastestWay(res);

  return bot.sendMessage(chatId, ResponseStringifier.responseStringify(foundDestinition));
});

async function requestToGoogleMaps(origin) {
  const currentDate            = new Date();
  const { lat, lng }           = origin;
  const destinationArray       = await (DaoMongoDB.readDestinationItems());
  const destinationCoordinates = CoordinateParser.parseCoordinates(destinationArray);

  const r = await client.distancematrix({
    params: {
      origins: [{ lat: lat, lng: lng }],
      destinations: destinationCoordinates,
      mode: travellingMode,
      departure_time: currentDate,
      key: GOOGLE_MAPS_API_KEY
    },
    timeout: 1000
  });
  return r.data;
}
