const request = require('request-promise');

module.exports = {
  post: async (url) => {
    const reponse = await request.post(url);
    return JSON.parse(reponse);
  },
};
