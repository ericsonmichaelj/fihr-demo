const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser')
const app = express();
const bearerToken = require('express-bearer-token');
const process = require('process');
const path = require('path');
const port = process.env.PORT || 8000;
const authenticate = require('./middleware/authenticate');

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json())
app.use(bearerToken());

app.post('/api/login', authenticate, (req, res) => {
  res.send({accessToken: req.accessToken } )
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port, () => {
  logger.info(`Listening in at port ${port}`);
});

module.exports = app;
