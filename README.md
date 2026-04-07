# Radios

A vanilla javascript client to play audio streams.

## Usage

- install package for local dev server.
- `npm run dev` to serve index.html at localhost:3000

## Add an audio stream

- go to `/src/stations.json`, add object.
- `npm run build` to generate all client files.

## Add an external link

- go to `/src/links.json`, add object.
- `npm run build` to generate all client files.

## Features

- Create a database to store radio streams. This database could be open and hosted in nostr protocol. Or a regular database.
- A user can favorite stations.
- A user can share stations.

## Nostr protocol.

- see /projects/radios-nostr for what I have so far.
- See chrome browser favorites for docs and interesting references.

## Reference

- [simple radio app](https://apps.apple.com/us/app/simple-radio-fm-am-stations/id891132290)
