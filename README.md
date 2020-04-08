# Mumble

Mumble is an app created for the noise dashboard project described in this medium article (insert link when done).

![](doc/mumble_diagram.png)

The setup is basically this:

- Raspberry PI 3 with the [Respeaker board](http://wiki.seeedstudio.com/ReSpeaker_4_Mic_Array_for_Raspberry_Pi/) provides microphone
- [Odas](https://github.com/introlab/odas), in particular, *odaslive* runs on the PI and does great things such as detecting sources and potential energy levels **(1)**
- Odaslive sends its data in JSON to the TCP server that mumble provides **(2)**
- Clients willing to receive JSON data connect to mumble via websockets **(3)**
- Mumble echoes the JSON data to the clients
- Win & profit :)


## Setup

- Raspberry PI
  - respeaker software
  - odasweb
  - ps2 startup (`systemctl enable pm2-pi`)
  - pm2 start app.js --node-args="--max-old-space-size=256"

## Deployment

- `pm2 deploy production update`
