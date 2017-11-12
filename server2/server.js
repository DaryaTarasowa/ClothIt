'use strict';

const express = require('express');
let compression = require('compression');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let path = require('path');
// import IntlWrapper from '../client/modules/Intl/IntlWrapper';
let async = require('async');
//
// // Webpack Requirements
// import webpack from 'webpack';
// import config from '../webpack.config.dev';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = express();


// Import required modules
let clothes_routes = require('./routes/cloth.routes');
let dummyDataCloth = require ('./dummyDataCloth');
let serverConfig = require('./config');

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  async.parallel([
     dummyDataCloth,
 ]);

});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(express.static(path.resolve(__dirname, '../dist/client')));
app.use('/api', clothes_routes);


// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN (server2) is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});
