async function getStations() {
  try {
    const response = await fetch("stations.json");
    const stations = await response.json();
    return stations;
  } catch (error) {
    console.error("Error loading stations:", error);
    document.getElementById("station-list").innerHTML =
      "<p>Error loading stations.</p>";
  }
}

async function playStation(stationId) {
  try {
    const allStations = await getStations();
    const selectedStation = allStations.find(
      (station) => station.id === stationId,
    );
    const audioPlayer = document.getElementById("audio-player");
    const nowPlaying = document.getElementById("now-playing");
    const stations = document.querySelectorAll(".station");

    audioPlayer.src = selectedStation.stream;
    audioPlayer.play().catch((error) => {
      console.error("error playing audio: ", error);
      nowPlaying.textContent = `Error playing ${selectedStation.name}`;
    });
    nowPlaying.textContent = `Now playing: ${selectedStation.name}`;
  } catch (error) {
    console.error("error attempting to play: ", error);
    document.getElementById("now-playing").innerHTML =
      "<p>Error attempting to play</p>";
  }
}
