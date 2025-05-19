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
  const audioPlayer = document.getElementById("audio-player");
  const nowPlaying = document.getElementById("now-playing");
  const playerStatus = document.getElementById("player-status");
  const stationLogo = document.getElementById("station-logo");
  const playBtn = document.getElementById("play-btn");
  const stopBtn = document.getElementById("stop-btn");
  const muteBtn = document.getElementById("mute-btn");
  const unmuteBtn = document.getElementById("unmute-btn");
  const airplayBtn = document.getElementById("airplay-btn");

  // Function to update play/stop button visibility
  function updatePlayStopButtons() {
    if (audioPlayer.paused || audioPlayer.ended) {
      playBtn.classList.remove("hide");
      stopBtn.classList.add("hide");
    } else {
      playBtn.classList.add("hide");
      stopBtn.classList.remove("hide");
    }
  }

  // Function to update mute/unmute button visibility
  function updateMuteButtons() {
    if (audioPlayer.muted) {
      muteBtn.classList.add("hide");
      unmuteBtn.classList.remove("hide");
    } else {
      muteBtn.classList.remove("hide");
      unmuteBtn.classList.add("hide");
    }
  }

  try {
    const allStations = await getStations();
    const selectedStation = allStations.find(
      (station) => station.id === stationId,
    );

    if (!selectedStation) {
      throw new Error("Station not found");
    }

    nowPlaying.textContent = `${selectedStation.name}`;
    playerStatus.textContent = "Loading...";
    audioPlayer.src = selectedStation.stream;

    audioPlayer.load();
    audioPlayer
      .play()
      .then(() => {
        playerStatus.textContent = "Playing";
        updatePlayStopButtons();
        updateMuteButtons();
      })
      .catch((error) => {
        console.error("error playing audio: ", error);
        playerStatus.textContent = "error loading station";
        updatePlayStopButtons();
      });

    playBtn.addEventListener("click", () => {
      if (selectedStation) {
        audioPlayer
          .play()
          .then(() => {
            playerStatus.textContent = "Playing";
            updatePlayStopButtons();
          })
          .catch((error) => {
            console.error(("error playing audio: ", error));
            playerStatus.textContent = "Error loading station";
          });
      }
    });

    stopBtn.addEventListener("click", () => {
      if (audioPlayer.src) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        playerStatus.textContent = "Stopped";
        updatePlayStopButtons();
      }
    });

    muteBtn.addEventListener("click", () => {
      audioPlayer.muted = true;
      updateMuteButtons();
    });

    unmuteBtn.addEventListener("click", () => {
      audioPlayer.muted = false;
      updateMuteButtons();
    });

    airplayBtn.addEventListener("click", () => {
      console.log("AirPlay button clicked");
      if (
        audioPlayer.src &&
        typeof audioPlayer.webkitShowPlaybackTargetPicker === "function"
      ) {
        console.log("Showing AirPlay picker");
        audioPlayer.webkitShowPlaybackTargetPicker();
      } else {
        console.log("AirPlay picker not available or no audio source");
        playerStatus.textContent = "AirPlay not available";
      }
    });

    audioPlayer.addEventListener("playing", () => {
      playerStatus.textContent = "Playing";
      updatePlayStopButtons();
    });

    audioPlayer.addEventListener("ended", () => {
      playerStatus.textContent = "Ended";
      updatePlayStopButtons();
    });

    audioPlayer.addEventListener("error", (event) => {
      console.error("Audio player error:", event);
      playerStatus.textContent = "Error loading station";
      if (audioPlayer.webkitCurrentPlaybackTargetIsWireless) {
        playerStatus.textContent = "AirPlay connection failed";
      }
      updatePlayStopButtons();
    });

    audioPlayer.addEventListener("volumechange", () => {
      updateMuteButtons();
    });

    audioPlayer.addEventListener(
      "webkitcurrentplaybacktargetiswirelesschanged",
      () => {
        console.log(
          "Wireless playback target changed:",
          audioPlayer.webkitCurrentPlaybackTargetIsWireless,
        );
        if (audioPlayer.webkitCurrentPlaybackTargetIsWireless) {
          playerStatus.textContent = "Playing via AirPlay";
        } else {
          playerStatus.textContent = "Playing locally";
        }
      },
    );

    // Check AirPlay availability
    audioPlayer.addEventListener(
      "webkitplaybacktargetavailabilitychanged",
      (event) => {
        console.log("AirPlay availability changed:", event.availability);
        if (event.availability === "available") {
          airplayBtn.style.display = "flex";
        } else {
          airplayBtn.style.display = "none";
        }
      },
    );

    // Add x-webkit-airplay attribute to audio element
    audioPlayer.setAttribute("x-webkit-airplay", "allow");

    airplayBtn.addEventListener("click", () => {
      if (audioPlayer.src && audioPlayer.webkitShowPlaybackTargetPicker) {
        audioPlayer.webkitShowPlaybackTargetPicker();
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      const stationButtons = document.querySelectorAll(".station button");
      stationButtons.forEach((button, index) => {
        button.removeAttribute("onClick");
        button.addEventListener("click", () => {
          playStation(`station-${index}`);
        });
      });
    });
  } catch (error) {
    console.error("error attempting to play: ", error);
    nowPlaying.textContent = "Error attempting to play";
    playerStatus.textContent = "Error";
    updatePlayStopButtons();
    updateMuteButtons();
  }
}
