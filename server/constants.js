const clientData = {
  client_id: process.env.UPHEALTH_CLIENT_ID,
  client_secret: process.env.UPHEALTH_CLIENT_SECRET,
};

const APP_USER_ID = process.env.UPHEALTH_APP_USER_ID;
const BASE_URL = 'https://api.1up.health/';


module.exports = {
  clientData,
  APP_USER_ID,
  BASE_URL,
};
