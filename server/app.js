const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

const authenticate = require('./middleware/authenticate');

app.get('/', authenticate);

app.post('/api/login', authenticate, (req, res) => {
  res.send({accessToken: req.accessToken } )
});

app.get('/callback', (req, res) => {
  res.sendStatus(200);
});


app.listen(8000, () => {
  logger.info('Listening in at port 8000');
});

module.exports = app;
