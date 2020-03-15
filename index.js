const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });
const webSocketsServerPort = 8080;

var clients = [];

wss.on('connection', function connection(ws, req) {
  console.log('Incoming connection from %s', req.connection.remoteAddress);
  clients.push(ws);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send('CONNECTED');

  ws.on('close', function() {
    console.log('%s disconnected', ws._socket.remoteAddress);
    let id = clients.indexOf(ws);
    delete clients[id];
    });
});

server.listen(webSocketsServerPort, function() {
  console.log("HTTP Server is listening on port " + webSocketsServerPort);
});

const sockets = require('./server.js')
// tracking
sockets.startTCPServer(9000, clients);
// potential
sockets.startTCPServer(9001, clients);
