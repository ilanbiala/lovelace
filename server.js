var http = require('http'),
  express = require('express'),
  io = require('socket.io'),
  redis = require('redis'),
  nlp = require('natural'),
  shortid = require('shortid'),
  app = express();

var server = require('http').createServer(app);
var io = io(server);
var client = redis.createClient();

client.on("error", function(err) {
  Console.log("Error: ", err);
});

io.on('connection', function(socket) {
  socket.on('message', function(message) {

  });

  var roomID = shortid.generate();
  socket.join(roomID);
  client.lpush('sessions', roomID);
});

io.

server.listen(3000);
