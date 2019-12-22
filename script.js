const constraints = { audio: true };

async function getMedia(constraints) {
  let stream = null;

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
      alert("uncheched");
    }
  });
