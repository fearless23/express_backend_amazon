const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;

var resultsRouter = require('./results');

// configure app to use bodyParser()
// this will let us get the data from a POST
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like http://localhost:4200
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

server.use('/itemsSearch', resultsRouter);

server.get('/', (req, res) => {
  res.json({data:'Welcome to Express Backend - Jassi'})
});

server.listen(port, function(){
  console.log('Server running on port '+ port)
});