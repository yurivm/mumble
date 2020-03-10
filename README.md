# Mumble

Mumble is an app created for the noise dashboard project described in this medium article(insert link).

It does two things:

- run a TCP server and accept JSON from odaslive
- provide a websocket connection for the client web app (if that works; let's see)

## Setup

- Raspberry PI
  - respeaker software
  - odasweb
  - ps2 startup (`systemctl enable pm2-pi`)
  - pm2 start app.js --node-args="--max-old-space-size=256"

## Deployment

- `pm2 deploy production update`
