'use strict';

var express = require('express');
var weather_tokyo = require("./weather_tokyo.json");
var weather_dubai = require("./weather_dubai.json");
var weather_vladivostok = require("./weather_vladivostok.json");

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  next();
});

app.get('/:town', function(req, res) {
  switch(req.params.town) {
    case "dubai": return res.json(weather_dubai); 
    case "vladivostok": return res.json(weather_vladivostok); 
    case "tokyo": return res.json(weather_tokyo); 
  }
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
