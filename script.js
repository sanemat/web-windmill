const constraints = { audio: true };
let stream = null;
const canvas = document.querySelector("#waveform");
const drawContext = canvas.getContext("2d");
drawContext.fillStyle = "rgba(0, 0, 0, 1)";
drawContext.fillRect(0, 0, canvas.width, canvas.height);

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

    const audioContext = new AudioContext();
    const sourceNode = audioContext.createMediaStreamSource(stream);
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    sourceNode.connect(analyserNode);

    function draw() {
      const barWidth = canvas.width / analyserNode.fftSize;
      const array = new Uint8Array(analyserNode.fftSize);
      analyserNode.getByteTimeDomainData(array);
      drawContext.fillStyle = "rgba(0, 0, 0, 1)";
      drawContext.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < analyserNode.fftSize; ++i) {
        const value = array[i];
        const percent = value / 255;
        const height = canvas.height * percent;
        const offset = canvas.height - height;

        drawContext.fillStyle = "lime";
        drawContext.fillRect(i * barWidth, offset, barWidth, 2);
      }

      requestAnimationFrame(draw);
    }

    draw();
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
