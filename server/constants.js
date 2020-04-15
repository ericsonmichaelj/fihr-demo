const clientData = {
  client_id: process.env.UPHEALTH_CLIENT_ID,
  client_secret: process.env.UPHEALTH_CLIENT_SECRET,
};
const BASE_URL = 'https://api.1up.health/';


module.exports = {
  clientData,
  BASE_URL,
};
