# Radios

- A clone of [streema simple radio](https://streema.com/). Exactly the same thing but without the adds. They even have an api endpoint that I can consume from the browser. Just clone the whole thing, player included, they have it solved, just follow them. An alternative would be to find a way to consume each radio station directly, although might need to create a server for this. Ideally, everything should happen on the client, no server involved, that's heavy infra.

# About
A simple website that I can add to my home screen as if it was a radio app. On loading, the site will display a list of my preset radios (I can add new ones as long as I have it's url). On click of a radio, the url will be opened in Apple Music app (or in browser if url sets so).
- It's the structure of a todo list, but for radios.
- Mock Simple Radio APP, so it works just the same but without adds, that would be more than enough.

## Features
A user can:
- reorder stations list.
- add new radios to the list (as long as they have a url, it can be added).
- A user can fav statios?
- Last played stations displayed on top of the list.
- a manifets.json file that allows to add the PWA to home screen.
- a nice looking icon for iphone/ipad/mac.

## Technical
- Each station is a json object with:
    - name
    - url
    - order-number (a number expressing its order in the list).
    - datetime last opened.
- On website load, all stations will be loaded from somewhere (a database, a file?) and stored in localStorage or cache. When a user reorders stations, this order will be saved in localStorage (just as a simple todo list).
- a server api will connect to database to retrieve statins main document.
- a server API route will POST a new station to be added, using a form with these fields: name, url. Url will be sanitized and validated, and saved as text. If it doesn't start with "https" it woun't be valid.

## Usage

- install packages.
- `npm run dev` to serve index.html at localhost:3000

Add a radio:
- go to /src/stations.json, add an object there.
- `npm run build` to grab stations from .json and make the html file.
