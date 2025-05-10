const generateHtml = (stations) => {
  const stationItems = stations
    .map(
      (station, index) => `
                <li>
                    <h2>${station.name}</h2>
                    <audio id="audio-${index}" controls>
                        <source src="${station.stream}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
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
                <ul>
                    ${stationItems}
                </ul>
            </section>
        </main>
        <script>
            const audioElements = document.querySelectorAll('audio');
            audioElements.forEach((audio) => {
                audio.addEventListener('play', () => {
                    audioElements.forEach((otherAudio) => {
                        if (otherAudio !== audio && !otherAudio.paused) {
                            otherAudio.pause();
                        }
                    });
                });
            });
        </script>
    </body>
</html>
    `;
};

module.exports = { generateHtml };
