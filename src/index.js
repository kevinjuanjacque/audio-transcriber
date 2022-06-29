'use strict';

const morgan = require('morgan');
const router = require('./routes/webhook_routes');

const token = process.env.WHATSAPP_TOKEN;

// Imports dependencies and set up http server
const request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  axios = require('axios').default,
  app = express().use(body_parser.json());

app.use(morgan('dev'));

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
app.use(router);
