// Load modules
// this code is from odasweb project, https://github.com/introlab/odas_web
// intend to update it a bit later on
const { StringDecoder } = require('string_decoder');
const net = require('net');

let trackingServer;
let potentialServer;
/*
 * Create TCP server for source tracking
 */

let remainingTrack = '';

exports.startTrackingServer = (clients) => {
  function handleConnection(conn) {
    const remoteAddress = `${conn.remoteAddress}:${conn.remotePort}`;
    console.log('new client connection from %s', remoteAddress);

    function onConnData(d) {
      const decoder = new StringDecoder();

      // Decode received string
      const stream = remainingTrack + decoder.write(d);
      const strs = stream.split('}\n{');
      if (strs.length < 2) {
        remainingTrack = stream;
        return;
      }
      strs.forEach((str, index) => {
        if (index === strs.length - 1) {
          remainingTrack = str;
          return;
        }

        if (str.charAt(0) !== '{') {
          str = `{${str}`;
        }

        if (str.charAt(str.length - 2) !== '}') {
          if (str.charAt(str.length - 3) !== '}') {
            str = `${str}}`;
          }
        }

        try {
          // console.log('TRACKING: RECEIVED DATA');
          // clients.forEach(function(client) {
          //   client.send(str);
          // });
        } catch (err) {
          console.log('Window was closed');
        }
      });
    }

    function onConnClose() {
      console.log('connection from %s closed', remoteAddress);
      // .mainWindow.webContents.send('remote-offline');
    }

    function onConnError(err) {
      console.log('Connection %s error: %s', remoteAddress, err.message);
    }

    conn.on('data', onConnData);
    conn.once('close', onConnClose);
    conn.on('error', onConnError);
  }

  trackingServer = net.createServer();
  trackingServer.on('connection', handleConnection);

  trackingServer.listen(9000, () => {
    console.log('server listening to %j', trackingServer.address());
  });
};


/*
 * Create TCP server for potential sources
 */

let remainingPot = '';

exports.startPotentialServer = (clients) => {
  function handlePotConnection(conn) {
    const remoteAddress = `${conn.remoteAddress}:${conn.remotePort}`;
    console.log('new client connection from %s', remoteAddress);

    function onConnData(d) {
      const decoder = new StringDecoder();

      // Decode received string
      const stream = decoder.write(d);
      // const stream = remainingPot + decoder.write(d);
      // const strs = stream.split('}\n{');
      // if (strs.length < 2) {
      //   remainingPot = stream;
      //   return;
      // }
      try {
        // this is where you can send the str somewhere
        clients.forEach(function(client) {
          client.send(stream);
        });
      } catch (err) {
        console.log('Error sending data: %s', err);
      }

      // strs.forEach((str, index) => {
      //   if (index === strs.length - 1) {
      //     remainingPot = str;
      //     return;
      //   }

      //   try {
      //     if (str.charAt(0) !== '{') {
      //       str = `{${str}`;
      //     }

      //     if (str.charAt(str.length - 2) !== '}') {
      //       if (str.charAt(str.length - 3) !== '}') {
      //         str = `${str}}`;
      //       }
      //     }
      //     // this is where you can send the str somewhere
      //     clients.forEach(function(client) {
      //       client.send(str);
      //     });
      //     // .mainWindow.webContents.send('newPotential',str);
      //   } catch (err) {
      //     console.log('Window was closed');
      //   }
      // });
    }

    function onConnClose() {
      console.log('connection from %s closed', remoteAddress);
      // .mainWindow.webContents.send('remote-offline');
    }

    function onConnError(err) {
      console.log('Connection %s error: %s', remoteAddress, err.message);
    }

    conn.on('data', onConnData);
    conn.once('close', onConnClose);
    conn.on('error', onConnError);
  }

  potentialServer = net.createServer();
  potentialServer.on('connection', handlePotConnection);

  potentialServer.listen(9001, () => {
    console.log('server listening to %j', potentialServer.address());
  });
};
