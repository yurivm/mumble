// I have
// I have taken this code is from odasweb project, https://github.com/introlab/odas_web
// but instead of buffering I send data straight away as it is received
// intend to update it a bit later on
const { StringDecoder } = require('string_decoder');
const net = require('net');

/*
 * Create TCP server that receives data and sends it to clients in a loop
 */

exports.startTCPServer = (port, clients) => {
  function handlePotConnection(conn) {
    const remoteAddress = `${conn.remoteAddress}:${conn.remotePort}`;
    console.log('new client connection from %s', remoteAddress);

    function onConnData(d) {
      const decoder = new StringDecoder();

      // Decode received string
      const stream = decoder.write(d);
      try {
        // this is where you can send the stream somewhere
        clients.forEach(function(client) {
          client.send(stream);
        });
      } catch (err) {
        console.log('Error sending data: %s', err);
      }
    }

    function onConnClose() {
      console.log('connection from %s closed', remoteAddress);
    }

    function onConnError(err) {
      console.log('Connection %s error: %s', remoteAddress, err.message);
    }

    conn.on('data', onConnData);
    conn.once('close', onConnClose);
    conn.on('error', onConnError);
  }

  const server = net.createServer();
  server.on('connection', handlePotConnection);

  server.listen(port, () => {
    console.log('server listening to %j', server.address());
  });
};
