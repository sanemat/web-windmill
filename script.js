const constraints = { audio: true };
let stream = null;
const canvas = document.querySelector("#waveform");
const drawContext = canvas.getContext("2d");

// stop-media-stream
function stopAndRemoveTrack(mediaStream) {
  return function(track) {
    track.stop();
    mediaStream.removeTrack(track);
  };
}

// stop-media-stream
function stopMediaStream(mediaStream) {
  if (!mediaStream) {
    return;
  }
  mediaStream.getTracks().forEach(stopAndRemoveTrack(mediaStream));
}

async function getMedia(constraints) {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    /* use the stream */
    drawContext.fillStyle = "rgba(0, 0, 0, 1)";
    drawContext.fillRect(0, 0, canvas.width, 100);
  } catch (err) {
    /* handle the error */
  }
}

document
  .querySelector("#menu__setting_mic")
  .addEventListener("change", event => {
    if (event.target.checked) {
      getMedia(constraints);
    } else {
      stopMediaStream(stream);
    }
  });
