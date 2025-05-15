const generateHtml = (stations) => {
  const stationItems = stations
    .map(
      (station, index) => `
                <li>
                    <h2>${station.name}</h2>
                    <div class="station" id="station-${index}">
                        <button onClick="playStation('${station.id}')">play</button>
                    </div>
                </li>
            `,
    )
    .join("");

  return `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="stream radio stations">
        <link rel="stylesheet" href="styles.css" />
        <link rel="manifest" href="manifest.json">
        <link rel="apple-touch-icon" href="icons/icon-192.png">
        <link rel="apple-touch-icon" sizes="180x180" href="icons/icon-180.png">
        <link rel="icon" type="image/png" href="favicon.ico">
        <title>Radio Stations</title>
    </head>
    <body>
        <header>
            <a href="/">
              <h1>Radios</h1>
            </a>
        </header>
        <main>
            <section>
                <h2>Stations</h2>
                <ul id="station-list">
                    ${stationItems}
                </ul>
                <div class="player">
                    <div id="now-playing">Select station</div>
                    <img src="icons/icon-180.png" alt="Cover Art">
                    <audio id="audio-player" controls></audio>
                </div>
            </section>
        </main>
        <script src="player.js"></script>
    </body>
</html>
    `;
};

module.exports = { generateHtml };
