const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const { mumbleConfig } = require("../config/mumble.js");
const tcp = require("./tcp_server.js");
const wss = require("./web_sockets_server.js");

// start the http + websocket server
wss.startWebSocketServer(mumbleConfig.webSockets.port);

// tracking, but we don't want to send any messages yet
tcp.startTCPServer(mumbleConfig.tracking.port, []);
// potential
tcp.startTCPServer(mumbleConfig.potential.port, wss.webSocketClients);
