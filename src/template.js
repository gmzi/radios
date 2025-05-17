const generateHtml = (stations) => {
  const stationItems = stations
    .map(
      (station, index) => `
                <li class="station" id="station-${index}">
                    <h2>${station.name}</h2>
                    <button onClick="playStation('${station.id}')">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                    </button>
                </li>
            `,
    )
    .join("");

  return `
  <!doctype html>
  <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
          <meta name="description" content="stream radio stations" />
          <link rel="stylesheet" href="styles.css" />
          <link rel="manifest" href="manifest.json" />
          <link rel="apple-touch-icon" href="icons/icon-192.png" />
          <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="icons/icon-180.png"
          />
          <link rel="icon" type="image/png" href="favicon.ico" />
          <title>Radio Stations</title>
      </head>
      <body>
          <header>
              <a href="/">
                  <h1>Radios</h1>
              </a>
          </header>
          <main>
              <div class="container">
                  <div class="stations" id="stations">
                      <h2>Stations</h2>
                      <ul id="station-list">
                          ${stationItems}
                      </ul>
                  </div>
              </div>
              <div class="player">
                  <div class="player-info">
                      <img
                          id="station-logo"
                          src="icons/icon-180.png"
                          alt="Station logo"
                      />
                  </div>
                  <div class="player-text">
                      <div id="now-playing"></div>
                      <div class="player-status" id="player-status">pick a station</div>
                  </div>
                  <div class="player-controls">
                      <button id="stop-btn" class="control-btn hide" aria-label="Stop">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause-icon lucide-pause"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>
                      </button>
                      <button
                          id="play-btn"
                          class="control-btn play-btn hide"
                          aria-label="Play"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                      </button>
                      <button id="mute-btn" class="control-btn" aria-label="Mute">
                        <svg id="icon-sound-off" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>
                      </button>
                      <button id="unmute-btn" class="control-btn hide" aria-label="Unmute">
                        <svg id="icon-sound-on" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/></svg>
                      </button>

                      <button
                          id="airplay-btn"
                          class="control-btn airplay-btn"
                          aria-label="AirPlay"
                      >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-airplay-icon lucide-airplay"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"/><path d="m12 15 5 6H7Z"/></svg>
                      </button>
                  </div>
                  <audio id="audio-player" controls></audio>
              </div>
          </main>
          <script src="player.js"></script>
      </body>
  </html>
    `;
};

module.exports = { generateHtml };
