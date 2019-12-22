const constraints = { audio: true };
let stream = null;

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
  } catch (err) {
    /* handle the error */
  }
}

document
  .getElementById("menu__setting_mic")
  .addEventListener("change", event => {
    if (event.target.checked) {
      getMedia(constraints);
    } else {
      stopMediaStream(stream);
    }
  });
