var http = require('http'),
  express = require('express'),
  io = require('socket.io'),
  redis = require('redis'),
  nlp = require('natural'),
  shortid = require('shortid'),
  chat = require('./chat');
  
var app = express();
var server = http.createServer(app);
var io = io(server);

client.on("error", function(err) {
  Console.log("Error: ", err);
});

io.on('connection', function(socket) {
  socket.on('message', function(message) {

  });

  var roomID = shortid.generate();
  socket.join(roomID);
});
  
server.listen(3000);
