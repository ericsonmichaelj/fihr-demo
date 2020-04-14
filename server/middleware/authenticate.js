const qs = require('querystring');
const logger = require('../utils/logger');

const {
  clientData, BASE_URL,
} = require('../constants');
const parsedReqest = require('../utils/parsedRequest');

const authenticate = async (req, res, next) => {
  try {
    const response =  await parsedReqest.post(`${BASE_URL}/user-management/v1/user/auth-code?${qs.stringify({ ...clientData, app_user_id: req.body.username })}`);
    if(!response.success) {
      res.status(401).send(response.error)
    }
    const { access_token } = await parsedReqest.post(`${BASE_URL}/fhir/oauth2/token?${qs.stringify({ ...clientData, code: response.code, grant_type: 'authorization_code' })}`);
    req.accessToken = access_token
    next()
  } catch (err) {
    logger.warn(err);
    return res.status(500).send({error:'Oops Something wrong'});
  }
};

module.exports = authenticate;
