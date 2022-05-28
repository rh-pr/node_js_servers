'use strict';

const createError = require ('http-errors');
const express = require ('express');
const path = require ('path');
const logger = require ('morgan');

const getProfileRouter = require ('./profiles');

const app = express ();

app.use (logger ('dev'));
app.use (express.json ());
app.use (express.urlencoded ({extended: false}));

app.use (express.static (path.join (__dirname, '../static')));

app.use ('/api/profiles', getProfileRouter ());

app.use ((req, res) => res.status (404).json ({message: 'Not Found'}));

app.use ((err, req, res, next) =>
  res.status (err.status || 500).json ({
    message: err.message,
  })
);

module.exports = app;
