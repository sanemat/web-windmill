document
  .getElementById("menu__setting_mic")
  .addEventListener("change", event => {
    if (event.target.checked) {
      alert("checked");
    } else {
      alert("uncheched");
    }
  });
