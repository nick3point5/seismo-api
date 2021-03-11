require("dotenv").config();
const WebSocket = require('ws');
const server = require('http').createServer();
const app = require('./app');
const db = require("./models");

const PORT = process.env.PORT || 4000;


const WSServer = WebSocket.Server;
const wss = new WSServer({
  server: server
});

server.on('request', app);

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

	ws.on('close', function (data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
      }
    });
  });

});

server.listen(PORT, function() {
  console.log(`Server running in port ${PORT}`);
});