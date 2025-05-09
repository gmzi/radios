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
        <title>Radio Stations</title>
        <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
        <header>
            <h1>Radios</h1>
        </header>
        <main>
            <section>
                <h1>Stations</h1>
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
