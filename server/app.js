const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser')
const app = express();
const bearerToken = require('express-bearer-token');
app.use(bodyParser.json())
app.use(bearerToken());
const authenticate = require('./middleware/authenticate');

app.get('/', authenticate);

app.post('/api/login', authenticate, (req, res) => {
  res.send({accessToken: req.accessToken } )
});

app.listen(8000, () => {
  logger.info('Listening in at port 8000');
});

module.exports = app;
