const expect = require('chai').expect
const net = require('net');
const tcp = require("../src/tcp_server.js");
const { mumbleConfig } = require("../config/mumble.js");

let testWSClient = {
  messages: [],
  send: function(msg) {
    this.messages.push(msg)
  }
};

let testTCPClient = {
  socket: new net.Socket(),
  send: function(message = "{'msg':'hello world!'}\n{'msg':'hello world 2!'}") {
    let that = this;
    this.socket.connect(mumbleConfig.potential.port, '127.0.0.1', function() {
      this.write(message);
      this.end();
      }
  );
  }
};

describe('tcp_server', function() {
  describe('#startTCPServer', function() {
    it('receives the messages from the TCP clients and forwards them to the WebSocket clients', function(done) {
      let server = tcp.createTCPServer(mumbleConfig.potential.port, [testWSClient]);
      server.listen(mumbleConfig.potential.port, () => {
        console.log('server listening to %j', server.address());

        testTCPClient.send();

        setTimeout(() => {
          server.close();
          expect(testWSClient.messages).to.have.lengthOf(2);
          expect(testWSClient.messages[0]).to.equal("{'msg':'hello world!'}");
          expect(testWSClient.messages[1]).to.equal("{'msg':'hello world 2!'}");
        }, 1000);
      });
      done();
    });
  });
});
